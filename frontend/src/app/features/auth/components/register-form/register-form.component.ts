import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '@features/auth/services/auth.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { ToastService } from '@shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  registerForm!: FormGroup;
  submitted = false;
  hide = signal(true);

/**
 * Captura o clique no botão de visibilidade da senha
 */
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  getPasswordVerify() {
    return this.registerForm.get('confirmPassword')?.value === this.registerForm.get('password')?.value;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (!this.getPasswordVerify()) {
      this.registerForm.get('confirmPassword')?.setErrors({ notMatching: true });
      return;
    }

    const data = {
      first_name: this.registerForm.get('first_name')?.value,
      last_name: this.registerForm.get('last_name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.authService.register(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.toastService.open({
            title: 'Sucesso!',
            desc: 'Conta criada com sucesso',
            type: 'success'
          })
          this.router.navigate(['/entrar']);
        },
        error: (err) => {
          console.error(err);
          this.toastService.open({
            title: 'Ops! ocorreu um erro',
            desc: 'não foi possível criar sua conta, tente novamente.',
            type: 'error'
          })
          this.submitted = false;
        },
        complete: () => {
          this.submitted = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
