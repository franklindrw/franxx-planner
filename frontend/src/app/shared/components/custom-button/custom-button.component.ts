import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

type ButtonTypes = 'submit' | 'button';
type VariantType = 'basic' | 'flat' | 'raised' | 'stroked';

@Component({
  selector: 'custom-button',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,

    MatIcon,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() buttonType: ButtonTypes = 'button';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() customClass: string = '';
  @Input() variant: VariantType = 'basic';
  @Input() ariaLabel: string = '';
}
