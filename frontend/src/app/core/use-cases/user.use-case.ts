import { inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs";

import { UserStore } from "@shared/stores/user.store";
import { ProfileService } from "@features/profile/services/profile.service";

import { environment } from "@env/environment";
import { COOKIE_PORT } from "@core/ports/cookie.port";

import type { IEditUser } from "@core/models/interfaces/user/IEditUser";
import type { ICreateUser } from "@features/auth/models/ICreateUser";

const { TOKEN_KEY } = environment;

/**
 * use-case para gerenciar os dados do usuário
 * Encapsula a lógica e armazeza os dados do usuário no store.
 * @method createUser - lógica para criar um novo usuário
 * @method updateUserDetails - lógica para atualizar os dados do usuário
 * @method deleteUserAccount - lógica para excluir a conta do usuário
 */

@Injectable()
export class UserUseCase {
  private readonly profileService = inject(ProfileService);
  private readonly userStore = inject(UserStore);
  private readonly cookieService = inject(COOKIE_PORT);

  private token = this.cookieService.get(TOKEN_KEY)!;
  private user = this.userStore.user()!;

  createUser(userData: ICreateUser) {
    return this.profileService.createProfile(userData).pipe(
      map(() => void 0)
    )
  }

  updateUserDetails(userData: Partial<IEditUser>) {
    return this.profileService.updateProfile(this.user.id, userData, this.token).pipe(
      tap((user) => {
        this.userStore.updateUser(user);
      }),
      map(() => void 0)
    );
  }

  deleteUserAccount() {
    return this.profileService.deleteProfile(this.user.id, this.token).pipe(
      tap(() => {
        this.userStore.clearUser();
      }),
      map(() => void 0)
    );
  }
}
