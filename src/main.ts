import './style.css';
import { ParticleNetwork } from './utils/particles';
import { TypingEffect } from './utils/typing';
import {
  initScrollObserver,
  initNavbarScroll,
  initSmoothScroll,
  initActiveNavLink,
} from './utils/scroll-observer';
import { validateName, validateEmail, validatePhone, validateMessage } from './utils/validation';
import { submitContactForm, sendChatMessage } from './utils/api';
import {
  hero,
  skills,
  workflowSteps,
  aiTools,
  aiQuote,
  projects,
  contactLinks,
  mockChatResponses,
} from './data/portfolio';
import type { ChatMessage } from './types';

// ═══ Initialize App ═══
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initHero();
  initMobileMenu();
  renderSkills();
  renderWorkflow();
  renderProjects();
  renderContactLinks();
  initContactForm();
  initChatWidget();
  initNavbarScroll();
  initSmoothScroll();
  initActiveNavLink();

  // Delay scroll observer to let page render
  requestAnimationFrame(() => {
    initScrollObserver();
  });
});

// ═══ Particles ═══
function initParticles(): void {
  const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  // Reduce particles on mobile
  const count = window.innerWidth < 768 ? 30 : 60;
  const network = new ParticleNetwork(canvas, count);
  network.start();
}

// ═══ Hero ═══
function initHero(): void {
  const nameEl = document.getElementById('hero-name');
  const descriptionEl = document.getElementById('hero-description');
  const roleTextEl = document.getElementById('hero-role-text');

  if (nameEl) nameEl.textContent = hero.name;
  if (descriptionEl) descriptionEl.textContent = hero.description;

  if (roleTextEl) {
    const typing = new TypingEffect(roleTextEl, hero.roles);
    typing.start();
  }

}

// ═══ Mobile Menu ═══
function initMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });
}

// ═══ Skills ═══
function renderSkills(): void {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = skills
    .map(
      (skill) => `
    <div class="skill-card reveal">
      <div class="skill-card__icon">${skill.icon}</div>
      <h4 class="skill-card__title">${skill.title}</h4>
      <div class="skill-card__tags">
        ${skill.tags.map((tag) => `<span class="skill-tag">${tag}</span>`).join('')}
      </div>
    </div>
  `
    )
    .join('');
}

// ═══ Workflow ═══
function renderWorkflow(): void {
  const stepsContainer = document.getElementById('workflow-steps');
  const toolsContainer = document.getElementById('ai-tools');
  const quoteEl = document.getElementById('ai-quote');

  if (stepsContainer) {
    stepsContainer.innerHTML = workflowSteps
      .map(
        (step) => `
      <div class="workflow__step reveal">
        <div class="workflow__step-number">${step.number}</div>
        <h4 class="workflow__step-title">${step.title}</h4>
        <p class="workflow__step-text">${step.description}</p>
      </div>
    `
      )
      .join('');
  }

  if (toolsContainer) {
    toolsContainer.innerHTML = aiTools
      .map(
        (tool) => `
      <div class="ai-tool">
        <span class="ai-tool__icon">${tool.icon}</span>
        <div>
          <div class="ai-tool__name">${tool.name}</div>
          <div class="ai-tool__desc">${tool.description}</div>
        </div>
      </div>
    `
      )
      .join('');
  }

  if (quoteEl) {
    quoteEl.textContent = aiQuote;
  }
}

// ═══ Projects ═══
function renderProjects(): void {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card ${project.colorClass} reveal">
      <div class="project-card__header">
        <span class="project-card__icon">${project.icon}</span>
        ${project.badge ? `<span class="project-card__badge">${project.badge}</span>` : ''}
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__subtitle">${project.subtitle}</p>
      <p class="project-card__description">${project.description}</p>
      <div class="project-card__metrics">
        ${project.metrics
          .map(
            (m) => `
          <span class="metric">
            <span class="metric__value">${m.value}</span> ${m.label}
          </span>
        `
          )
          .join('')}
      </div>
      <div class="project-card__stack">
        ${project.stack.map((s) => `<span class="stack-tag">${s}</span>`).join('')}
      </div>
      <button class="project-card__toggle" data-project="${project.id}">
        <span>Подробнее</span>
        <span class="project-card__toggle-arrow">▼</span>
      </button>
      <div class="project-card__details" id="details-${project.id}">
        <div class="project-card__details-content">
          <ul>
            ${project.details.map((d) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Toggle details
  grid.addEventListener('click', (e) => {
    const toggle = (e.target as HTMLElement).closest('.project-card__toggle');
    if (!toggle) return;

    const projectId = toggle.getAttribute('data-project');
    const details = document.getElementById(`details-${projectId}`);
    if (!details) return;

    const isOpen = details.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);

    const textSpan = toggle.querySelector('span:first-child');
    if (textSpan) {
      textSpan.textContent = isOpen ? 'Свернуть' : 'Подробнее';
    }
  });
}

// ═══ Contact Links ═══
function renderContactLinks(): void {
  const container = document.getElementById('contact-links');
  if (!container) return;

  container.innerHTML = contactLinks
    .map(
      (link) => `
    <a href="${link.href}" class="contact__link" target="${link.href.startsWith('http') ? '_blank' : '_self'}" rel="noopener">
      <span class="contact__link-icon">${link.icon}</span>
      <div>
        <div class="contact__link-label">${link.label}</div>
        <div class="contact__link-value">${link.value}</div>
      </div>
    </a>
  `
    )
    .join('');
}

// ═══ Contact Form ═══
function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;

  const nameInput = document.getElementById('contact-name') as HTMLInputElement;
  const phoneInput = document.getElementById('contact-phone') as HTMLInputElement;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement;
  const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
  const submitBtn = document.getElementById('form-submit') as HTMLButtonElement;
  const statusEl = document.getElementById('form-status') as HTMLDivElement;

  // Real-time validation
  const validateField = (input: HTMLInputElement | HTMLTextAreaElement, validator: (v: string) => string | null) => {
    const error = validator(input.value);
    const errorEl = document.getElementById(`error-${input.name}`);

    if (error) {
      input.classList.add('error');
      input.classList.remove('valid');
      if (errorEl) {
        errorEl.textContent = `⚠ ${error}`;
        errorEl.classList.add('visible');
      }
    } else {
      input.classList.remove('error');
      if (input.value.trim()) input.classList.add('valid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    return !error;
  };

  nameInput.addEventListener('blur', () => validateField(nameInput, validateName));
  emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail));
  phoneInput.addEventListener('blur', () => validateField(phoneInput, validatePhone));
  messageInput.addEventListener('blur', () => validateField(messageInput, validateMessage));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all
    const nameValid = validateField(nameInput, validateName);
    const emailValid = validateField(emailInput, validateEmail);
    const phoneValid = validateField(phoneInput, validatePhone);
    const messageValid = validateField(messageInput, validateMessage);

    if (!nameValid || !emailValid || !phoneValid || !messageValid) return;

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    statusEl.className = 'form__status';
    statusEl.textContent = '';

    try {
      await submitContactForm({
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      });

      statusEl.className = 'form__status success';
      statusEl.textContent = '✓ Сообщение отправлено! Я свяжусь с вами в ближайшее время.';
      form.reset();

      // Remove valid classes
      [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
        input.classList.remove('valid', 'error');
      });
    } catch (error) {
      statusEl.className = 'form__status error';
      statusEl.textContent = `✕ ${error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позже.'}`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });
}

// ═══ Chat Widget ═══
function initChatWidget(): void {
  const toggle = document.getElementById('chat-toggle') as HTMLButtonElement;
  const window_ = document.getElementById('chat-window') as HTMLDivElement;
  const closeBtn = document.getElementById('chat-close') as HTMLButtonElement;
  const messagesContainer = document.getElementById('chat-messages') as HTMLDivElement;
  const input = document.getElementById('chat-input') as HTMLInputElement;
  const sendBtn = document.getElementById('chat-send') as HTMLButtonElement;
  const typingIndicator = document.getElementById('chat-typing') as HTMLDivElement;

  if (!toggle || !window_ || !closeBtn || !messagesContainer || !input || !sendBtn) return;

  const chatHistory: ChatMessage[] = [];
  let messageCount = 0;
  const MAX_MESSAGES = 10;

  // Add welcome message
  addBotMessage(mockChatResponses.default);

  // Toggle chat
  toggle.addEventListener('click', () => {
    const isOpen = window_.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    if (isOpen) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    window_.classList.remove('open');
    toggle.classList.remove('open');
  });

  // Send message
  async function handleSend() {
    const message = input.value.trim();
    if (!message || messageCount >= MAX_MESSAGES) return;

    messageCount++;
    input.value = '';
    addUserMessage(message);
    chatHistory.push({ role: 'user', content: message });

    // Show typing indicator
    typingIndicator.classList.add('visible');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
      // Try API first, fallback to mock
      let reply: string;
      try {
        reply = await sendChatMessage(
          message,
          chatHistory.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }))
        );
      } catch {
        // Fallback to mock responses
        reply = getMockResponse(message);
      }

      chatHistory.push({ role: 'bot', content: reply });
      addBotMessage(reply);
    } catch {
      addBotMessage('Извините, произошла ошибка. Попробуйте позже.');
    } finally {
      typingIndicator.classList.remove('visible');
    }

    if (messageCount >= MAX_MESSAGES) {
      addBotMessage('Вы достигли лимита сообщений. Для продолжения — свяжитесь с Кириллом напрямую!');
      input.disabled = true;
      sendBtn.disabled = true;
    }
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  function addUserMessage(text: string) {
    const div = document.createElement('div');
    div.className = 'chat__message chat__message--user';
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function addBotMessage(text: string) {
    const div = document.createElement('div');
    div.className = 'chat__message chat__message--bot';
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function getMockResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('навык') || lower.includes('стек') || lower.includes('технолог') || lower.includes('skill'))
      return mockChatResponses.skills;
    if (lower.includes('проект') || lower.includes('кейс') || lower.includes('project') || lower.includes('портфолио'))
      return mockChatResponses.projects;
    if (lower.includes('опыт') || lower.includes('experience') || lower.includes('работ'))
      return mockChatResponses.experience;
    if (lower.includes('контакт') || lower.includes('связ') || lower.includes('email') || lower.includes('телефон'))
      return mockChatResponses.contact;
    return `Кирилл — AI Engineer и Python Developer. Он создаёт автономных ИИ-агентов и автоматизации. Спросите меня о его навыках, проектах или контактах!`;
  }
}
