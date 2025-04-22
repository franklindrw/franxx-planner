import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '@env/environment';
import { CookieService } from '@shared/services/cookie.service';
import { ToastService } from '@shared/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const TOKEN_KEY: string = environment.TOKEN_KEY;

  const isLoggedIn = cookieService.checkCookie(TOKEN_KEY);

  if (isLoggedIn) {
    return true;
  }

  toast.open({
    type: 'error',
    title: 'Ops! usuário não autenticado',
    desc: 'Favor faça login para acessar essa página',
  })

  router.navigate(['/entrar'], {
    queryParams: {
      redirectTo: state.url,
    },
  });
  return false;
};
