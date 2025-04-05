import { Inject, Injectable } from '@angular/core';
import { HTTP_PORT, type IHttpPort } from '@core/ports/http.port';

import { from, Observable } from 'rxjs';

import type { ICreateUser } from '../models/ICreateUser';
import type { IUser } from '@core/models/interfaces/IUser';

@Injectable()
export class AuthService {

  constructor(@Inject(HTTP_PORT) private http: IHttpPort) {}

  login(email: string, password: string) {
    return from(this.http.post('/auth/login', { email, password }));
  }

  register(body: ICreateUser): Observable<IUser> {
    return from(this.http.post<IUser>('/users', body));
  }


}
