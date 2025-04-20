import { Routes } from '@angular/router';
import { authGuard } from '@features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(r => r.HOME_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./features/profile/profile.routes').then(r => r.PROFILE_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '**', // caso a rota não exista
    redirectTo: 'home'
  }
];
