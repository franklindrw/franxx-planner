import { Injectable, inject } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private readonly cookie = inject(NgxCookieService);

  setCookie(name: string, value: string, expires?: 1): void {
    this.cookie.set(name, value, {
      expires: expires,
      path: '/',
      sameSite: 'Lax',
      secure: true,
    })
  }

  getCookie(name: string): string {
    return this.cookie.get(name);
  }

  checkCookie(name: string): boolean {
    return this.cookie.check(name);
  }

  deleteCookie(name: string): void {
    this.cookie.delete(name, '/');
  }

  deleteAllCookies(): void {
    this.cookie.deleteAll('/');
  }
}
