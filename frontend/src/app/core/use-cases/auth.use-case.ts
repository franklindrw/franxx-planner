import { inject, Injectable } from "@angular/core";
import { map, switchMap, tap } from "rxjs";

import { environment } from "@env/environment";
import { COOKIE_PORT } from "@core/ports/cookie.port";

import { AuthService } from "@features/auth/services/auth.service";
import { ProfileService } from "@features/profile/services/profile.service";

import { UserStore } from "@shared/stores/user.store";

const { TOKEN_KEY } = environment;

/**
 * Use case para gerenciar a autenticação do usuário.
 * Encapsula a lógica de autenticação e armazeza os dados do usuário no store..
 */
@Injectable({
  providedIn: 'root',
})
export class AuthUseCase {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly cookieService = inject(COOKIE_PORT);
  private readonly userStore = inject(UserStore);

  login(email: string, password: string) {
    return this.authService.login(email, password).pipe(
      switchMap((res) => {
        this.cookieService.set(TOKEN_KEY, res.access_token);
        return this.profileService.getProfile(res.user.id, res.access_token);
      }),
      tap((user) => {
        this.userStore.setUser(user);
      }),
      map(() => void 0)
    );
  }

  logout() {
    this.userStore.clearUser();
    this.cookieService.deleteAll();
  }
}
