import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: any = {
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  loading: boolean = false;
  userId: number = 0;

  constructor(
    private _messageService: MessageService,
    private _router: Router,
    private _authService: AuthService,
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this._authService.getUser().subscribe({
      next: (res: any) => {
        if (res && res.user) {
          this.userId = res.user.id;
          this.form.email = res.user.email;
          this.form.firstName = res.user.firstName;
          this.form.lastName = res.user.lastName;
          this._authService.setUserInfo(res.user.firstName);
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (error: any) => {
        console.error('Error fetching user data:', error);        
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des données utilisateur',
        });
      },
    });
  }
    
  get userFirstName() {
    return this._authService.userFirstName;
  }

  updateProfile() {
    this.loading = true;
    const updatedData = {
      email: this.form.email,
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      password: this.form.password,
      confirmPassword: this.form.confirmPassword,
    };

    this._authService.updateProfile(updatedData, this.userId).subscribe({ 
      next: (res: any) => {
        this.loading = false;
        this._messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Profil mis à jour avec succès',
        });
        // Mettre à jour les informations locales
        this._authService.setUserInfo(res.firstName);
        // Rafraîchir les données du formulaire
        this.getUserData();
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.loading = false;
        console.error('Erreur lors de la mise à jour du profil', error);
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la mise à jour du profil',
        });
      }
    });
  }
}
