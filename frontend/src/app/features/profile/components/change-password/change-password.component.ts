import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, type FormGroup } from '@angular/forms';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';

import { UserUseCase } from '@core/use-cases/user.use-case';
import { formErrorMessage } from '@shared/utils/formErrorMessage';
import { CustomButtonComponent } from '@shared/components/custom-button/custom-button.component';
import { ToastService } from '@shared/services/toast.service';

import type { IUpdatePassword } from '@features/profile/interfaces/i-update-password';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    NgIf,

    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    MatError,

    CustomButtonComponent,
  ],
  providers: [UserUseCase],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})

export class ChangePasswordComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userUseCase = inject(UserUseCase);
  private readonly toastService = inject(ToastService);

  submitting = false;
  hidePassword = signal(true);
  newPassword = signal(true);
  formPassword!: FormGroup;
  errorMessage = formErrorMessage;

  ngOnInit(): void {
    this.formPassword = this.formBuilder.group({
      current_pass: ['', [Validators.required]],
      new_pass: ['', [Validators.required, Validators.minLength(6)]],
      confirm_pass: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  /** controla o estado da visibilidade da senha atual */
  toggleHidePassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  /** controla o estado da visibilidade da nova senha */
  toggleNewPassword() {
    this.newPassword.set(!this.newPassword());
  }

  private validatePassword({new_pass, confirm_pass}: IUpdatePassword) {
    if (new_pass !== confirm_pass) {
      this.formPassword.get('confirm_pass')?.setErrors({ notMatching: true });
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.formPassword.invalid) return;
    if (!this.validatePassword(this.formPassword.value)) return;

    this.submitting = true;

    this.userUseCase.updateUserPassword(this.formPassword.value)
      .subscribe({
        next: () => {
          this.submitting = false;
          this.toastService.open({
            title: 'Sucesso',
            desc: 'Senha alterada com sucesso',
            type: 'success',
          });
          this.formPassword.reset();
        }
        , error: (error) => {
          console.error(error);
          this.submitting = false;
          this.toastService.open({
            title: 'Ops! ocorreu um erro!',
            desc: error.error?.message || 'Não foi possível alterar a senha, tente novamente.',
            type: 'error'
          })
        }
      })
  }
}
