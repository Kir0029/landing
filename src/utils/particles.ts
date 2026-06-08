interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private mouse = { x: -1000, y: -1000 };

  private readonly particleCount: number;
  private readonly connectionDistance: number = 150;
  private readonly mouseRadius: number = 200;
  private particleColor = '239, 68, 68';
  private lineColor = '239, 68, 68';

  constructor(canvas: HTMLCanvasElement, particleCount = 60) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.particleCount = particleCount;

    // Fetch theme colors dynamically
    const style = getComputedStyle(document.documentElement);
    const primaryRgb = style.getPropertyValue('--color-primary-rgb').trim();
    if (primaryRgb) {
      this.particleColor = primaryRgb;
      this.lineColor = primaryRgb;
    }

    this.resize();
    this.initParticles();
    this.bindEvents();
  }

  private resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  private initParticles(): void {
    this.particles = [];
    const rect = this.canvas.getBoundingClientRect();
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  start(): void {
    const animate = () => {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private update(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > rect.width) p.vx *= -1;
      if (p.y < 0 || p.y > rect.height) p.vy *= -1;

      // Mouse interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouseRadius) {
        const force = (this.mouseRadius - dist) / this.mouseRadius;
        p.vx -= (dx / dist) * force * 0.02;
        p.vy -= (dy / dist) * force * 0.02;
      }

      // Limit velocity
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1) {
        p.vx = (p.vx / speed) * 1;
        p.vy = (p.vy / speed) * 1;
      }
    });
  }

  private draw(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const opacity = (1 - dist / this.connectionDistance) * 0.2;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${this.lineColor}, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.particleColor}, ${p.opacity})`;
      this.ctx.fill();
    });

    // Mouse glow
    if (this.mouse.x > 0 && this.mouse.y > 0) {
      const gradient = this.ctx.createRadialGradient(
        this.mouse.x,
        this.mouse.y,
        0,
        this.mouse.x,
        this.mouse.y,
        this.mouseRadius
      );
      gradient.addColorStop(0, `rgba(${this.particleColor}, 0.08)`);
      gradient.addColorStop(1, `rgba(${this.particleColor}, 0)`);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, rect.width, rect.height);
    }
  }
}
