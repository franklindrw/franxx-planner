import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '@features/auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;
  submitting = false;
  hide = signal(true);

  toggleHide() {
    this.hide.set(!this.hide());
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

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
    this.submitting = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    }

    this.authService.login(data.email, data.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.toastService.open({
            title: 'Sucesso!',
            desc: 'Logado com sucesso',
            type: 'success'
          })
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastService.open({
            title: 'Ops! ocorreu um erro',
            desc: 'não foi possível logar, tente novamente.',
            type: 'error'
          })
          this.submitting = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
