import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
