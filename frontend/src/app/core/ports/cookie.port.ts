import { InjectionToken } from "@angular/core";

export type CookieOptions = {
  expires?: number;
  path?: string;
  sameSite?: 'Lax' | 'Strict' | 'None';
  secure?: boolean;
}

export interface ICookiePort {
  get<T>(name: string): string | null;
  set(name: string, value: string, options?: CookieOptions): void;
  check(name: string): boolean;
  delete(name: string): void;
  deleteAll(): void;
}

export const COOKIE_PORT = new InjectionToken<ICookiePort>('COOKIE_PORT');
