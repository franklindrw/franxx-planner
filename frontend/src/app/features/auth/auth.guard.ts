import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { UserStore } from '@shared/stores/user.store';

export const authGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const toast = inject(ToastService);

  const isLoggedIn = userStore.isLoggedIn();

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
