import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
export class ProfilePageComponent {
  private readonly router = inject(Router);

  back() {
    this.router.navigate(['/home']);
  }
}
