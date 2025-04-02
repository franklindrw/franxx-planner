import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastComponent } from '@shared/components/custom-toast/custom-toast.component';
import { ICustomToast } from '@shared/models/custom-toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  open(data: ICustomToast) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      data,
      duration: 3000
    });
  }
}
