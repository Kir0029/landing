import type { ContactFormData } from '../types';

const API_BASE = '/.netlify/functions';

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.error || `Ошибка сервера (${response.status})`);
  }

  return result;
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при получении ответа от AI');
  }

  const result: ApiResponse<{ reply: string }> = await response.json();
  return result.data?.reply || 'Извините, не удалось получить ответ.';
}
