import { Component, EventEmitter, Input, input, Output, output, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({  required: true }) username!: string;
  @Input({  required: true }) userId!: number;

  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
