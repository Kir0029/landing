export class TypingEffect {
  private element: HTMLElement;
  private texts: string[];
  private currentIndex: number = 0;
  private currentChar: number = 0;
  private isDeleting: boolean = false;
  private timeoutId: number | null = null;

  private readonly typeSpeed: number;
  private readonly deleteSpeed: number;
  private readonly pauseTime: number;

  constructor(
    element: HTMLElement,
    texts: string[],
    options?: {
      typeSpeed?: number;
      deleteSpeed?: number;
      pauseTime?: number;
    }
  ) {
    this.element = element;
    this.texts = texts;
    this.typeSpeed = options?.typeSpeed ?? 80;
    this.deleteSpeed = options?.deleteSpeed ?? 40;
    this.pauseTime = options?.pauseTime ?? 2000;
  }

  start(): void {
    this.tick();
  }

  stop(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private tick(): void {
    const currentText = this.texts[this.currentIndex];
    
    if (this.isDeleting) {
      this.currentChar--;
    } else {
      this.currentChar++;
    }

    this.element.textContent = currentText.substring(0, this.currentChar);

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentChar === currentText.length) {
      delay = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      delay = 500;
    }

    this.timeoutId = window.setTimeout(() => this.tick(), delay);
  }
}
