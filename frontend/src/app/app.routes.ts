import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastre-se',
    pathMatch: 'full'
  },
  {
    path: 'cadastre-se',
    loadComponent: () => import('./modules/auth/register-page/register-page.component').then(m => m.RegisterPageComponent)
  }
];
