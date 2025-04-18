import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthService } from "./services/auth.service";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'entrar',
    pathMatch: 'full'
  },
  {
    path: 'entrar',
    component: LoginPageComponent,
    providers: [AuthService],
  },
  {
    path: 'cadastre-se',
    component: RegisterPageComponent,
    providers: [AuthService],
  }
]
