import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(r => r.HOME_ROUTES),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./features/profile/profile.routes').then(r => r.PROFILE_ROUTES)
  }
];
