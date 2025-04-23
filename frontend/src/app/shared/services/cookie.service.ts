import { Injectable, inject } from '@angular/core';
import { COOKIE_PORT, type CookieOptions, type ICookiePort } from '@core/ports/cookie.port';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly cookie = inject<ICookiePort>(COOKIE_PORT);

  setCookie(name: string, value: string, options?: CookieOptions): void {
    this.cookie.set(name, value, options);
  }

  getCookie(name: string): string | null {
    return this.cookie.get(name);
  }

  checkCookie(name: string): boolean {
    return this.cookie.check(name);
  }

  deleteCookie(name: string): void {
    this.cookie.delete(name);
  }

  deleteAllCookies(): void {
    this.cookie.deleteAll();
  }
}
