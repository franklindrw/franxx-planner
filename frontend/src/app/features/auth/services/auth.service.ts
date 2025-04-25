import { inject, Injectable } from '@angular/core';
import { HTTP_PORT, type IHttpPort } from '@core/ports/http.port';

import { from, Observable } from 'rxjs';

import type { IAuthResp } from '../models/IAuth';

/**
 * Serviço de autenticação
 * @method login - Requisição de autenticação
 */
@Injectable()
export class AuthService {

  private readonly http = inject<IHttpPort>(HTTP_PORT);

  login(email: string, password: string): Observable<IAuthResp> {
    return from(this.http.post<IAuthResp>('/auth/login', { email, password }));
  }
}
