import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordComponent } from '@features/profile/components/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile-page',
  imports: [
    MatIconModule,
    MatInputModule,
    MatError,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  private readonly navigation = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log(userId);
  }

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
    this.navigation.navigate(['/perfil/desinscreva-se']);
  }

}
