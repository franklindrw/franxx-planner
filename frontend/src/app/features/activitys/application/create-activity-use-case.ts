import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '@env/environment';
import { COOKIE_PORT } from '@core/ports/cookie.port';

import { ActivitysService } from '../services/activitys.service';

const { TOKEN_KEY } = environment;

@Injectable()
export class CreateActivityUseCase {
  private readonly activitysService = inject(ActivitysService);
  private readonly cookieService = inject(COOKIE_PORT);

  private token = this.cookieService.get<string>(TOKEN_KEY)!;

  execute(data: ICreateEventDto): Observable<IEvent> {
    return this.activitysService.create(data, this.token);
  }
}
