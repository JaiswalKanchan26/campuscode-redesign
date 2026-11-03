import { Injectable, signal } from '@angular/core';

/** Simple 5-digit captcha. Replace with a server-verified captcha in production. */
@Injectable({ providedIn: 'root' })
export class CaptchaService {
  readonly code = signal(this.generate());

  refresh(): void { this.code.set(this.generate()); }
  matches(value: string): boolean { return value.trim() === this.code(); }

  private generate(): string { return String(Math.floor(10000 + Math.random() * 90000)); }
}
