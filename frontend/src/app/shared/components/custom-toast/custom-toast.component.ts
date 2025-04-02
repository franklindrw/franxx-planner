import { Component, Inject } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import type { ICustomToast } from '@shared/models/custom-toast.model';

@Component({
  selector: 'app-custom-toast',
  imports: [
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss'
})
export class CustomToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ICustomToast,
    public snackBarRef: MatSnackBarRef<CustomToastComponent>
  ) {}

  close() {
    this.snackBarRef.dismiss();
  }
}
