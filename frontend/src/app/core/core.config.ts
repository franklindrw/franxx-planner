import { provideHttpClient } from "@angular/common/http";

import { HttpClientAdapter } from "./adapters/http-client.adapter";
import { HTTP_PORT } from "./ports/http.port";

export const CORE_CONFIG = [
  provideHttpClient(),
  {
    provide: HTTP_PORT,
    useClass: HttpClientAdapter,
  }
];
