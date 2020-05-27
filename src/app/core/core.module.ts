import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsNavbarComponent } from 'src/app/core/bs-navbar/bs-navbar.component';
import { HomeComponent } from 'src/app/core/home/home.component';
import { LoginComponent } from 'src/app/core/login/login.component';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
