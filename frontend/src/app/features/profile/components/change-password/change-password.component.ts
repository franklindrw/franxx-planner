import { Component, signal } from '@angular/core';

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

@Component({
  selector: 'app-change-password',
  imports: [
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
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})

export class ChangePasswordComponent {
  hidePassword = signal(true);
  newPassword = signal(true);

  toggleHidePassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  toggleNewPassword() {
    this.newPassword.set(!this.newPassword());
  }
}
