import type { ContactFormData } from '../types';

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Имя обязательно для заполнения';
  if (trimmed.length < 2) return 'Имя должно содержать минимум 2 символа';
  if (trimmed.length > 100) return 'Имя слишком длинное';
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Email обязателен для заполнения';
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return 'Введите корректный email';
  return null;
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null; // phone is optional
  const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
  if (!phoneRegex.test(trimmed)) return 'Введите корректный номер телефона';
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Сообщение обязательно для заполнения';
  if (trimmed.length < 10) return 'Сообщение должно содержать минимум 10 символов';
  if (trimmed.length > 2000) return 'Сообщение слишком длинное (макс. 2000 символов)';
  return null;
}

export function validateForm(data: ContactFormData): Record<string, string | null> {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
    message: validateMessage(data.message),
  };
}

export function isFormValid(errors: Record<string, string | null>): boolean {
  return Object.values(errors).every((e) => e === null);
}
