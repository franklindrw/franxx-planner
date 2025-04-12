import { Component, inject, input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  username = input<string>();

  private readonly router = inject(Router);

  logout() {
    this.router.navigate(['/entrar']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
