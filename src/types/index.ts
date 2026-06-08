export interface Project {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  metrics: Metric[];
  details: string[];
  colorClass: string;
  badge?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  tags: string[];
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

export interface AITool {
  icon: string;
  name: string;
  description: string;
}

export interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface FormFieldConfig {
  name: keyof ContactFormData;
  label: string;
  type: 'text' | 'tel' | 'email' | 'textarea';
  placeholder: string;
  required: boolean;
  validation?: (value: string) => string | null;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}
