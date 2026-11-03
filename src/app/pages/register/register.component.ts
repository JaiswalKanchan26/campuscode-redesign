import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CaptchaService } from '../../core/captcha.service';

const passwordsMatch = (group: AbstractControl): ValidationErrors | null =>
  group.get('password')?.value === group.get('confirm')?.value ? null : { mismatch: true };

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['../auth/auth.shared.css'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  readonly captcha = inject(CaptchaService);

  readonly message = signal<{ text: string; ok: boolean } | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      accountType: [{ value: 'Student', disabled: true }],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
      captcha: ['', Validators.required],
      adult: [false, Validators.requiredTrue],
    },
    { validators: passwordsMatch }
  );

  submit(): void {
    const f = this.form;
    const v = f.getRawValue();
    if (f.controls.name.invalid) return this.fail('Enter your full name.');
    if (f.controls.email.invalid) return this.fail('Enter a valid email address.');
    if (f.controls.password.invalid) return this.fail('Use at least 8 characters for your password.');
    if (f.hasError('mismatch')) return this.fail('Passwords don’t match.');
    if (!this.captcha.matches(v.captcha)) return this.fail('Captcha doesn’t match. Try the new code.');
    if (!v.adult) return this.fail('Confirm that you are 18 or older.');

    // TODO: call your AuthService here, e.g. this.auth.register(v).subscribe(...)
    this.message.set({ text: 'Verification code sent. Check your email.', ok: true });
  }

  private fail(text: string): void {
    this.message.set({ text, ok: false });
    this.captcha.refresh();
    this.form.controls.captcha.reset('');
  }
}
