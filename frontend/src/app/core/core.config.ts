import { provideHttpClient } from "@angular/common/http";

import { HTTP_PORT } from "./ports/http.port";
import { COOKIE_PORT } from "./ports/cookie.port";

import { HttpClientAdapter } from "@shared/adapters/http-client.adapter";
import { CookieAdapter } from "@shared/adapters/cookie.adapter";

export const CORE_CONFIG = [
  provideHttpClient(),
  {
    provide: HTTP_PORT,
    useClass: HttpClientAdapter,
  },
  {
    provide: COOKIE_PORT,
    useClass: CookieAdapter,
  }
];
