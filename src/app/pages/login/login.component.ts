import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userEmail: string = '';
  password: string = '';

  form: any = {
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  // Changé de 'loading' à 'isLoading' pour plus de clarté
  isLoading: boolean = false;

  constructor(
    public _auth: AuthService,
    private _messageService: MessageService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  onLogin() {
    // Ajout d'une vérification pour empêcher les clics multiples
    if (this.isLoading) return;

    this.isLoading = true; // Début du chargement
    this._messageService.clear();
    let error = false;

    if (this.userEmail === '') {
      error = true;
      this._messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "L'Email est obligatoire",
      });
    }

    if (this.password === '') {
      error = true;
      this._messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le mot de passe est obligatoire',
      });
    }

    if (!error) {
      let data = {
        email: this.userEmail,
        password: this.password,
      };

      this._auth.login(data).subscribe({
        next: (res: any) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: res.message || 'Connexion réussie',
          });

          setTimeout(() => {
            this._router.navigate(['/profile']);
          }, 1000);
        },
        error: (err: any) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message || 'Erreur de connexion',
          });
          this.isLoading = false; // Fin du chargement en cas d'erreur
        },
        complete: () => {
          this.isLoading = false; // Fin du chargement après succès
        },
      });
    } else {
      this.isLoading = false; // Fin du chargement si erreur de validation
    }
  }

  validate() {
    // Ajout d'une vérification pour empêcher les clics multiples
    if (this.isLoading) return;

    this.isLoading = true; // Début du chargement
    this._messageService.clear();
    let error = false;

    // Vérification si tous les champs sont vides
    const allFieldsEmpty = Object.values(this.form).every(
      (value) => value === ''
    );

    if (allFieldsEmpty) {
      error = true;
      this._messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Tous les champs sont obligatoire',
      });
    } else {
      // Vérifications individuelles des champs seulement si tous les champs ne sont pas vides
      if (this.form.email === '') {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "L'Email est obligatoire",
        });
      } else if (
        !this.form.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ) {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "L'Email n'est pas valide",
        });
      }

      if (this.form.password === '') {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le mot de passe est obligatoire',
        });
      } else if (!this.form.password.match(/^.{8,}$/)) {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le mot de passe doit contenir au moins 8 caractères',
        });
      }

      if (this.form.firstName === '') {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le prénom est obligatoire',
        });
      }

      if (this.form.lastName === '') {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le nom est obligatoire',
        });
      }

      if (this.form.confirmPassword === '') {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Confirmer le mot de passe est obligatoire',
        });
      } else if (this.form.password !== this.form.confirmPassword) {
        error = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Les mots de passe doivent être identiques',
        });
      }
    }

    if (error) {
      this.isLoading = false; // Fin du chargement si erreur de validation
    } else {
      this._authService.createUser(this.form).subscribe({
        next: (res: any) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this._router.navigate(['/profile']);
        },
        error: (error: any) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error.message,
          });
          this.isLoading = false; // Fin du chargement en cas d'erreur
        },
        complete: () => {
          this.isLoading = false; // Fin du chargement après succès
        },
      });
    }
  }
}
