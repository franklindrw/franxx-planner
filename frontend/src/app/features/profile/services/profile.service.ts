import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { HTTP_PORT, IHttpPort } from '@core/ports/http.port';

import type { IUser } from '@core/models/interfaces/user/IUser';
import type { IEditUser } from '@core/models/interfaces/user/IEditUser';

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

  updateProfile(userId: string, body: Partial<IEditUser>, token: string): Observable<IUser> {
    return from(this.http.put<IUser>(`/users/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  deleteProfile(userId: string, token: string): Observable<void> {
    return from(this.http.delete<void>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
  }
}
