import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomToastComponent } from '@shared/components/custom-toast/custom-toast.component';
import { ICustomToast } from '@shared/models/custom-toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Dispara um toast com base nos dados fornecidos.
   * @param {string} data.type - O tipo de cor usada (success, error, info, warning).
   * @param {string} data.desc - Descrição opcional do toast.
   * @param {number} data.title - Titulo mostrado no topo do toast.
   */
  open(data: ICustomToast) {
    this.snackBar.openFromComponent(CustomToastComponent, {
      data,
      duration: 3000
    });
  }
}
