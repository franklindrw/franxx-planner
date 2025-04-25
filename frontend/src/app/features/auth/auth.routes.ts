import { Routes } from "@angular/router";

import { AuthUseCase } from "@core/use-cases/auth.use-case";

import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { UserUseCase } from "@core/use-cases/user.use-case";
import { AuthService } from "./services/auth.service";
import { ProfileService } from "@features/profile/services/profile.service";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'entrar',
    pathMatch: 'full'
  },
  {
    path: 'entrar',
    component: LoginPageComponent,
    providers: [AuthUseCase, AuthService]
  },
  {
    path: 'cadastre-se',
    component: RegisterPageComponent,
    providers: [UserUseCase, ProfileService]
  }
]
