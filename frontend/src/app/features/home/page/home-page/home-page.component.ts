import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '@shared/components/header/header.component';
import { ActivityPanelComponent } from '@features/home/components/activity-panel/activity-panel.component';
import { InvitesPanelComponent } from '@features/home/components/invites-panel/invites-panel.component';

import { UserStore } from '@shared/stores/user.store';
import { AuthUseCase } from '@features/auth/application/auth.use-case';

import type { IUser } from '@core/models/interfaces/user/IUser';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, ActivityPanelComponent, InvitesPanelComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
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
