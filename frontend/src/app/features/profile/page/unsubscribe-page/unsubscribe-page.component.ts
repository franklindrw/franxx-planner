import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsubscribe-page',
  imports: [
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './unsubscribe-page.component.html',
  styleUrl: './unsubscribe-page.component.scss'
})
export class UnsubscribePageComponent {
  private readonly router = inject(Router);

  goback() {
    this.router.navigate(['/home']);
  }
}
