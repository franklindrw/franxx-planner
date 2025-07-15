import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ToastService } from '@shared/services/toast.service';
import { AuthUseCase } from '@features/auth/application/auth.use-case';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { formErrorMessage } from '@shared/utils/formErrorMessage';

@Component({
  selector: 'app-login-form',
  imports: [
    MatInputModule,
    MatError,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authUseCase = inject(AuthUseCase);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  loginForm!: FormGroup;
  submitting = false;
  hide = signal(true);
  errorMessage = formErrorMessage;

  redirect =
    this.router.routerState.snapshot.root.queryParams['redirectTo'] || '/home';

  toggleHide() {
    this.hide.set(!this.hide());
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.submitting = true;
    const { email, password } = this.loginForm.value;

    this.authUseCase.login(email, password).subscribe({
      next: () => this.router.navigate([this.redirect]),
      error: (err) => {
        console.error(err);
        this.toastService.open({
          title: 'Ops! ocorreu um erro!',
          desc: err.error?.message || 'Erro desconhecido',
          type: 'error',
        });
        this.submitting = false;
      },
    });
  }
}
