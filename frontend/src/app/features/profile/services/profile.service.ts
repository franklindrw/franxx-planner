import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { HTTP_PORT, IHttpPort } from '@core/ports/http.port';

import type { IUser } from '@core/models/interfaces/user/IUser';
import type { IEditUser } from '@core/models/interfaces/user/IEditUser';
import type { ICreateUser } from '@features/auth/models/ICreateUser';
import type { IUpdatePassword } from '@features/profile/interfaces/i-update-password';

/**
 * Serviço de perfil do usuário
 * @method getProfile - Requisição de perfil do usuário
 * @method createProfile - Requisição de criação de perfil do usuário
 * @method updateProfile - Requisição de atualização de perfil do usuário
 * @method updatePass - Requisição de atualização de senha do usuário
 * @method deleteProfile - Requisição de exclusão de perfil do usuário
 */

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject<IHttpPort>(HTTP_PORT);

  getProfile(userId: string, token: string): Observable<IUser> {
    return from(this.http.get<IUser>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  createProfile(data: ICreateUser): Observable<IUser> {
    return from(this.http.post<IUser>('/users', data));
  }

  updateProfile(userId: number, body: Partial<IEditUser>, token: string): Observable<IUser> {
    return from(this.http.patch<IUser>(`/users/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  updatePass(userId: number, body: Omit<IUpdatePassword, 'confirm_pass'>, token: string): Observable<IUser> {
    return from(this.http.patch<IUser>(`/users/${userId}/password`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  deleteProfile(userId: number, token: string): Observable<void> {
    return from(this.http.delete<void>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }
}
