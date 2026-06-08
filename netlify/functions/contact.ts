import { Handler } from '@netlify/functions';

// In-memory rate limiting (per warm container instance)
const ipCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  // Rate Limiting
  const clientIp = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown';
  const now = Date.now();
  const rateLimit = ipCache.get(clientIp);

  if (rateLimit) {
    if (now < rateLimit.resetTime) {
      if (rateLimit.count >= RATE_LIMIT_MAX) {
        return {
          statusCode: 429,
          body: JSON.stringify({ success: false, error: 'Слишком много запросов. Пожалуйста, подождите 1 минуту.' }),
        };
      }
      rateLimit.count++;
    } else {
      ipCache.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    ipCache.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  try {
    const { name, phone, email, message } = JSON.parse(event.body || '{}');

    // Validation
    if (!name || name.trim().length < 2) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Имя должно содержать минимум 2 символа' }),
      };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Некорректный адрес электронной почты' }),
      };
    }
    if (!message || message.trim().length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Сообщение должно содержать минимум 10 символов' }),
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'andrey.piskynov2006@gmail.com';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Конфигурация отправки писем не настроена' }),
      };
    }

    // Call Resend API via native fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // onboarding@resend.dev is allowed for free tier/unverified domains
        to: recipientEmail,
        reply_to: email, // Click reply in inbox to directly write back to user
        subject: `Новое сообщение от ${name} — Портфолио`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fcfaf6; border-radius: 8px; border: 1px solid rgba(61, 48, 37, 0.08);">
            <h2 style="color: #3d3025; border-bottom: 2px solid #c85a32; padding-bottom: 10px; margin-top: 0;">Новое сообщение с Kirill.dev</h2>
            <p style="margin: 15px 0;"><strong style="color: #5c4e43;">От кого:</strong> ${name}</p>
            <p style="margin: 15px 0;"><strong style="color: #5c4e43;">Email:</strong> <a href="mailto:${email}" style="color: #c85a32; text-decoration: none;">${email}</a></p>
            ${phone ? `<p style="margin: 15px 0;"><strong style="color: #5c4e43;">Телефон:</strong> ${phone}</p>` : ''}
            <div style="margin-top: 20px;">
              <strong style="color: #5c4e43;">Текст сообщения:</strong>
              <div style="margin-top: 8px; padding: 15px; background: #ffffff; border-left: 4px solid #c85a32; border-radius: 4px; color: #261e18; line-height: 1.6; white-space: pre-wrap; box-shadow: 0 2px 4px rgba(61, 48, 37, 0.03);">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <hr style="border: 0; border-top: 1px solid rgba(61, 48, 37, 0.08); margin: 30px 0;">
            <p style="font-size: 11px; color: #938275; text-align: center; margin: 0;">Это автоматическое уведомление с вашего сайта-портфолио.</p>
          </div>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API call failed:', result);
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, error: 'Ошибка отправки через Resend API' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Сообщение успешно отправлено!' }),
    };
  } catch (error) {
    console.error('Contact handler exception:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Внутренняя ошибка сервера при обработке' }),
    };
  }
};
