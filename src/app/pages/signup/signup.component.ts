import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})

export class SignupComponent {
  loading: boolean = false;
  form: any = {
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  constructor(
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}

  cancel() {
    console.log('Cancel clicked');
    this.loading = false;
    // this.form = {
    //   password: '',
    //   confirmPassword: '',
    //   email: '',
    //   firstName: '',
    //   lastName: '',
    // };
  }

 
}
