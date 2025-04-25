import { AuthUseCase } from "@core/use-cases/auth.use-case";
import { HomePageComponent } from "./page/home-page/home-page.component";
import { AuthService } from "@features/auth/services/auth.service";

export const HOME_ROUTES = [
  {
    path: '',
    component: HomePageComponent,
    providers: [AuthUseCase, AuthService]
  }
]
