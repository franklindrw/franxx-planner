import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './infra/services/http.service';



@NgModule({
  declarations: [],
  providers: [
    HttpService,
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
