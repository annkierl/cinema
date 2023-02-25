import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { pattern } from '@shared/patterns';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  loginForm = this.createControlGroup();

  createControlGroup() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(100), Validators.pattern(pattern.emailValidatorRegex)],
      }),
      password: this.fb.control('', {
        validators: [Validators.required],
      }),
    });
  }
  get passwordCtrl() {
    return this.loginForm.controls.password;
  }
  get emailCtrl() {
    return this.loginForm.controls.email;
  }
  checkValidationAndAuth() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.logIn(this.emailCtrl.value, this.passwordCtrl.value);
  }
}
