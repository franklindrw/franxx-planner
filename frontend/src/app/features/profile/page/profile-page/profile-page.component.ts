import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ChangePasswordComponent } from '@features/profile/components/change-password/change-password.component';
import { UserFormComponent } from '@features/profile/components/user-form/user-form.component';
import { ProfileService } from '@features/profile/services/profile.service';

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
export class ProfilePageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  private readonly navigation = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly profileService = inject(ProfileService);

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
