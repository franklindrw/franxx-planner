import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { HTTP_PORT, type IHttpPort } from '@core/ports/http.port';

/**
 * Serviço de atividades
 * Este serviço é responsável por gerenciar as atividades dos usuários.
 */
@Injectable()
export class ActivitysService {
  private readonly http = inject<IHttpPort>(HTTP_PORT);

  create(data: ICreateEventDto, token: string): Observable<IEvent> {
    return from(
      this.http.post<IEvent>('/events', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}
