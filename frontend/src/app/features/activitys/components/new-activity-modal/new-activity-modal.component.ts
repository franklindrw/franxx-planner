import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  type FormGroup,
} from '@angular/forms';

import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthUseCase } from '@features/auth/application/auth.use-case';

import { CreateActivityUseCase } from '@features/activitys/application/create-activity-use-case';
import { ActivitysService } from '@features/activitys/services/activitys.service';
import { CustomDatapickerComponent } from '@shared/components/custom-datapicker/custom-datapicker.component';
import { ToastService } from '@shared/services/toast.service';
import { formErrorMessage } from '@shared/utils/formErrorMessage';
import { AuthService } from '@features/auth/services/auth.service';
import { ProfileService } from '@features/profile/services/profile.service';

@Component({
  selector: 'app-new-activity-modal',
  imports: [
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
    CustomDatapickerComponent,
    ReactiveFormsModule,
  ],
  providers: [
    CreateActivityUseCase,
    ActivitysService,
    AuthUseCase,
    AuthService,
  ],
  templateUrl: './new-activity-modal.component.html',
  styleUrl: './new-activity-modal.component.scss',
})
export class NewActivityModalComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly createActivityUseCase = inject(CreateActivityUseCase);
  private readonly toastService = inject(ToastService);
  private readonly authUseCase = inject(AuthUseCase);

  public dialogRef = inject(MatDialogRef<NewActivityModalComponent>);

  submitting = false;
  formActivity!: FormGroup;
  errorMessage = formErrorMessage;

  ngOnInit(): void {
    this.formActivity = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      address: [''],
      time: [''],
    });
  }

  onSubmit(): void {
    if (this.formActivity.invalid) {
      this.formActivity.markAllAsTouched();
      return;
    }

    const eventData: ICreateEventDto = this.formActivity.value;

    this.submitting = true;

    this.createActivityUseCase.execute(eventData).subscribe({
      next: () => {
        this.submitting = false;
        this.toastService.open({
          title: 'Criado!',
          desc: 'A atividade foi criada com sucesso.',
          type: 'success',
        });
        this.formActivity.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        this.submitting = false;
        console.error('Error creating activity:', error);

        if (error.status === 401) {
          this.toastService.open({
            title: 'Sessão Expirada!',
            desc: 'Sua sessão expirou, faça login novamente.',
            type: 'warning',
          });

          this.authUseCase.logout();
          return;
        }

        this.toastService.open({
          title: 'Ops!',
          desc: 'Ocorreu um erro ao criar a atividade.',
          type: 'error',
        });
      },
    });
  }
}
