import { UserUseCase } from "@core/use-cases/user.use-case";
import { ProfilePageComponent } from "./page/profile-page/profile-page.component";
import { UnsubscribePageComponent } from "./page/unsubscribe-page/unsubscribe-page.component";
import { ProfileService } from "./services/profile.service";

export const PROFILE_ROUTES = [
  {
    path: ':id',
    component: ProfilePageComponent,
    providers: [UserUseCase, ProfileService]
  },
  {
    path: 'desinscreva-se',
    component: UnsubscribePageComponent,
    providers: [UserUseCase, ProfileService]
  }
]
