import { inject, Injectable } from "@angular/core";
import { ICookiePort } from "@core/ports/cookie.port";

import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import type { CookieOptions } from "@core/ports/cookie.port";

@Injectable({
  providedIn: 'root'
})
export class CookieAdapter implements ICookiePort {
  private readonly cookie = inject(NgxCookieService);

  get(name: string): string | null {
    return this.cookie.get(name) || null;
  }

  set(name: string, value: string, options?: CookieOptions): void {
    this.cookie.set(name, value, {
      expires: options?.expires || 1,
      path: options?.path || '/',
      sameSite: options?.sameSite || 'Lax',
      secure: options?.secure || true,
    });
  }

  check(name: string): boolean {
    return this.cookie.check(name);
  }

  delete(name: string): void {
    this.cookie.delete(name, '/');
  }

  deleteAll(): void {
    this.cookie.deleteAll('/');
  }
}
