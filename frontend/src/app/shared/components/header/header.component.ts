import { Component, inject, input, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { CookieService } from '@shared/services/cookie.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '@env/environment';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  private readonly cookieService = inject(CookieService);

  private readonly TOKEN_KEY: string = environment.TOKEN_KEY;

  username = input<string>();

  private readonly router = inject(Router);

  logout() {
    this.cookieService.deleteCookie(this.TOKEN_KEY);
    this.router.navigate(['/entrar']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
