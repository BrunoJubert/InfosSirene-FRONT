import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandardLayoutComponent } from './standard-layout/standard-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    StandardLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
  ], 
  exports: [
    StandardLayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
