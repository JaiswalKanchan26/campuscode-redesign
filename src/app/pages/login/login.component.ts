import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CaptchaService } from '../../core/captcha.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['../auth/auth.shared.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  readonly captcha = inject(CaptchaService);

  readonly message = signal<{ text: string; ok: boolean } | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    captcha: ['', Validators.required],
  });

  submit(): void {
    const { password, captcha } = this.form.getRawValue();
    if (this.form.controls.email.invalid) return this.fail('Enter a valid email address.');
    if (!password) return this.fail('Enter your password.');
    if (!this.captcha.matches(captcha)) return this.fail('Captcha doesn’t match. Try the new code.');

    // TODO: call your AuthService here, e.g. this.auth.login(email, password).subscribe(...)
    this.message.set({ text: 'Welcome back. Redirecting to your dashboard…', ok: true });
  }

  private fail(text: string): void {
    this.message.set({ text, ok: false });
    this.captcha.refresh();
    this.form.controls.captcha.reset('');
  }
}
