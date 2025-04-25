import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
import { UserUseCase } from '@core/use-cases/user.use-case';

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
export class RegisterFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userUseCase = inject(UserUseCase);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  registerForm!: FormGroup;
  submitted = false;
  hide = signal(true);

  /** Captura o clique no botão de visibilidade da senha */
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private getPasswordVerify() {
    return this.registerForm.get('confirmPassword')?.value === this.registerForm.get('password')?.value;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.submitted = true;

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

    this.userUseCase.createUser(data)
      .subscribe({
        next: () => {
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
      })
  }
}
