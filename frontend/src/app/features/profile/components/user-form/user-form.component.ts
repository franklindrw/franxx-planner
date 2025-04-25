import { Component, inject, OnInit } from '@angular/core';

import { UserStore } from '@shared/stores/user.store';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';

import type { IUser } from '@core/models/interfaces/user/IUser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserUseCase } from '@core/use-cases/user.use-case';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'user-form',
  imports: [
    MatIconModule,
    MatInputModule,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  private readonly userStore = inject(UserStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userUseCase = inject(UserUseCase);
  private readonly toastService = inject(ToastService);

  user: IUser = this.userStore.user()!
  editForm!: FormGroup;
  submitting = false;

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      first_name: [this.user.first_name, [Validators.required, Validators.minLength(4)]],
      last_name: [this.user.last_name, [Validators.required, Validators.minLength(4)]],
      email: [this.user.email, [Validators.required, Validators.email]],
    })
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    // console.log(this.editForm.value);
    this.submitting = true;

    const data = this.editForm.value;

    this.userUseCase.updateUserDetails(data)
      .subscribe({
        next: () => {
          this.toastService.open({
            title: 'Dados Alterados!',
            desc: 'Seus dados foram alterados com sucesso.',
            type: 'success'
          })
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.toastService.open({
            title: 'Ops! ocorreu um erro!',
            desc: 'Não foi possível atualizar os dados, tente novamente.',
            type: 'error'
          })
          this.submitting = false;
        },
      })
  }
}
