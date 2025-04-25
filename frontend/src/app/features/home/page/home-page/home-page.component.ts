import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '@shared/components/header/header.component';

import { environment } from '@env/environment';
import { IUser } from '@core/models/interfaces/user/IUser';
import { UserStore } from '@shared/stores/user.store';
import { AuthUseCase } from '@core/use-cases/auth.use-case';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly userStore = inject(UserStore);
  private readonly authUseCase = inject(AuthUseCase);
  private readonly router = inject(Router);

  user: IUser = this.userStore.user()!;

  logout() {
    this.authUseCase.logout();
    this.router.navigate(['/entrar']);
  }
}
