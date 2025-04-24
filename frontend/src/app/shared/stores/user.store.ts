import { computed, inject, signal } from "@angular/core";

import type { IUser } from "@core/models/interfaces/user/IUser";
import { COOKIE_PORT } from "@core/ports/cookie.port";
import { environment } from "@env/environment";

const USER_KEY = environment.TOKEN_USER;

/**
 * Store para gerenciar os dados do usuário logado.
 * @property {IUser | null} user - Getter reativo para acessar o usuário.
 * @method setUser - Define o usuário logado e armazena no cookie.
 * @method updateUser - Atualiza os dados do usuário logado.
 * @method isLoggedIn - Verifica se o usuário está logado.
 * @method clearUser - Limpa os dados do usuário logado.
 */
export class UserStore {
  private readonly cookieService = inject(COOKIE_PORT);

  // inicializa o usuário com os dados do cookie, se disponíveis
  private initialUser = this.getUserFromCookie();

  // armazena o usuário logado em um state reativo
  private _user = signal<IUser | null>(this.initialUser);

  // fornece um getter reativo para acessar o usuário
  readonly user = computed(() => this._user());

  // método para verificar se o usuário está logado
  readonly isLoggedIn = computed(() => !!this._user());

  setUser(user: IUser | null) {
    this._user.set(user);
    this.cookieService.set(USER_KEY, JSON.stringify(user));
  }

  updateUser(update: Partial<IUser>) {
    this._user.update(prev => {
      const updated = { ...prev!, ...update };
      this.cookieService.set(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  clearUser() {
    this._user.set(null);
  }

  private getUserFromCookie(): IUser | null {
    const user = this.cookieService.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
