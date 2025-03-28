import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouterModule } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  imports: [
    RegisterPageComponent,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'entrar',
        pathMatch: 'full'
      },
      {
        path: 'entrar',
        component: LoginPageComponent
      },
      {
        path: 'cadastre-se',
        component: RegisterPageComponent
      }
    ])
  ],
  providers: [
    provideNgxMask()
  ],
})
export class AuthModule { }
