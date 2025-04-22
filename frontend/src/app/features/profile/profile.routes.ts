import { ProfilePageComponent } from "./page/profile-page/profile-page.component";
import { UnsubscribePageComponent } from "./page/unsubscribe-page/unsubscribe-page.component";

export const PROFILE_ROUTES = [
  {
    path: ':id',
    component: ProfilePageComponent
  },
  {
    path: 'desinscreva-se',
    component: UnsubscribePageComponent
  }
]
