import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RegisterPageComponent,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'cadastre-se',
        pathMatch: 'full'
      },
      {
        path: 'cadastre-se',
        component: RegisterPageComponent
      }
    ])
  ]
})
export class AuthModule { }
