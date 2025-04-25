import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { UserUseCase } from '@core/use-cases/user.use-case';
import { ToastService } from '@shared/services/toast.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-unsubscribe-page',
  imports: [
    MatButtonModule,
    MatProgressSpinner,
    MatIcon,
    NgIf,
  ],
  templateUrl: './unsubscribe-page.component.html',
  styleUrl: './unsubscribe-page.component.scss'
})

export class UnsubscribePageComponent {
  private readonly router = inject(Router);
  private readonly userUseCase = inject(UserUseCase);
  private readonly toast = inject(ToastService);

  submitting = false;

  unsubscribe() {
    this.submitting = true;

    this.userUseCase.deleteUserAccount()
      .subscribe({
        next: () => {
          this.toast.open({
            title: 'Conta Excluida!',
            desc: 'Sua conta foi excluida com sucesso.',
            type: 'success'
          })

          this.router.navigate(['/entrar']);
        },

        error: (err) => {
          console.error(err);

          this.toast.open({
            title: 'Ops! ocorreu um erro!',
            desc: 'Nao foi possivel excluir sua conta, tente novamente.',
            type: 'error'
          })

          this.submitting = false;
        }
      })
  }

  goback() {
    this.router.navigate(['/home']);
  }
}
