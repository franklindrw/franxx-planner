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

  getProfile(userId: string): Observable<IUser> {
    return from(this.http.get<IUser>(`/users/${userId}`));
  }

  updateProfile(userId: string, body: Partial<IEditUser>): Observable<IUser> {
    return from(this.http.put<IUser>(`/users/${userId}`, body));
  }

  deleteProfile(userId: string) {
    return from(this.http.delete<void>(`/users/${userId}`));
  }
}
