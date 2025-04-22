import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '@shared/components/header/header.component';
import { CookieService } from '@shared/services/cookie.service';

import { environment } from '@env/environment';
import { UserResp } from '@features/auth/models/IAuth';

const { TOKEN_USER } = environment;

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly cookieService = new CookieService();
  private readonly router = inject(Router);

  userData = this.cookieService.getCookie(TOKEN_USER);
  user: UserResp = JSON.parse(this.userData);

  logout() {
    this.cookieService.deleteAllCookies();
    this.router.navigate(['/entrar']);
  }
}
