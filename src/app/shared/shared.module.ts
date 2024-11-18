import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ProgressSpinnerModule,
    ToastModule,
    InputNumberModule
  ],
  exports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ProgressSpinnerModule,
    ToastModule,
    InputNumberModule
  ],
})
export class SharedModule {}