import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginFormComponent,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
