import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Importer MessageService

declare const grecaptcha: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _contactService: ContactService,
    private _router: Router,
    private _messageService: MessageService // Injecter MessageService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      message: ['', Validators.required],
      recaptchaToken: [''], // Champ pour le token reCAPTCHA
    });

    // Charger le script reCAPTCHA dynamiquement
    this.loadRecaptchaScript();
  }

  loadRecaptchaScript() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=' + environment.recaptcha.siteKey;
    script.async = true;
    script.defer = true; // Ajoutez defer ici
    document.body.appendChild(script);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      grecaptcha.ready(() => {
        grecaptcha.execute(environment.recaptcha.siteKey, { action: 'submit' }).then((token: string) => {
          this.contactForm.patchValue({ recaptchaToken: token }); // Mettre à jour le champ caché avec le token

          const formData = this.contactForm.value; // Préparez les données du formulaire

          this._contactService.envoyerMessage(formData).subscribe(
            (response) => {
              console.log('Message envoyé avec succès', response);
              this.contactForm.reset(); // Réinitialiser le formulaire
              this._messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Votre message a été envoyé avec succès.',
              });
              // Rediriger vers /home après un court délai
              setTimeout(() => {
                this._router.navigate(['/home']);
              }, 2000); // Délai de 2 secondes pour laisser le temps à l'utilisateur de lire le message
            },
            (error) => {
              console.error('Erreur lors de l\'envoi du message', error);
              this._messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Erreur lors de l\'envoi du message.',
              });
            }
          );
        });
      });
    // } else {
    //   this.showValidationErrors(); // Afficher les erreurs de validation
    // }
  }

  // showValidationErrors() {
  //   Object.keys(this.contactForm.controls).forEach((field) => {
  //     const control = this.contactForm.get(field);
  //     if (control && control.invalid) {
  //       let errorMessage = '';
  //       if (control.errors?.required) {
  //         errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} est obligatoire.`;
  //       } else if (control.errors?.email) {
  //         errorMessage = 'Email n\'est pas valide.';
  //       }
  //       this._messageService.add({
  //         severity: 'error',
  //         summary: 'Erreur',
  //         detail: errorMessage,
  //       });
  //     }
  //   });
  // }

  // onCancel() {
  //   this._router.navigate(['/home']); // Rediriger vers /home
  // }
}
}
