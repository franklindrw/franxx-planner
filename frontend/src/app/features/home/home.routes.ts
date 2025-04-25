import { AuthUseCase } from "@core/use-cases/auth.use-case";
import { HomePageComponent } from "./page/home-page/home-page.component";

export const HOME_ROUTES = [
  {
    path: '',
    component: HomePageComponent,
    providers: [AuthUseCase]
  }
]
