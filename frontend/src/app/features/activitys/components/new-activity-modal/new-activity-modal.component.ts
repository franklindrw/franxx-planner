import { Component } from '@angular/core';

import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CustomDatapickerComponent } from '@shared/components/custom-datapicker/custom-datapicker.component';

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
    CustomDatapickerComponent,
  ],
  templateUrl: './new-activity-modal.component.html',
  styleUrl: './new-activity-modal.component.scss',
})
export class NewActivityModalComponent {}
