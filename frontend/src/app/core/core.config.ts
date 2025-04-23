import { provideHttpClient } from "@angular/common/http";

import { HttpClientAdapter } from "./adapters/http-client.adapter";
import { HTTP_PORT } from "./ports/http.port";
import { COOKIE_PORT } from "./ports/cookie.port";
import { CookieAdapter } from "./adapters/cookie.adapter";

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
