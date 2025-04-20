import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '@shared/services/cookie.service';
import { ToastService } from '@shared/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const isLoggedIn = cookieService.checkCookie('frxx_tk');

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
