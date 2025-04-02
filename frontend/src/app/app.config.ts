import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { CORE_CONFIG } from '@core/core.config';
import { MATERIAL_CONFIG } from '@shared/material-config';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  ...MATERIAL_CONFIG,
  ...CORE_CONFIG,
]
};
