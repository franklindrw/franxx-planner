import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ChangePasswordComponent } from '@features/profile/components/change-password/change-password.component';
import { UserFormComponent } from '@features/profile/components/user-form/user-form.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  imports: [
    MatIconModule,
    MatButtonModule,
    UserFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly navigation = inject(Router);
  private readonly dialog = inject(MatDialog);

  back() {
    this.navigation.navigate(['/home']);
  }

  openEditPassword(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '90%',
      maxWidth: '400px',
      minHeight: '300px',
    })
  }

  unsuscribe() {
    this.navigation.navigate(['perfil/desinscreva-se']);
  }
}
