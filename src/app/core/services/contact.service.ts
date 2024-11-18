import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {
    emailjs.init(environment.emailjs.publicKey);
  }

  envoyerMessage(formData: any): Observable<any> {
    // Envoyer la notification à votre boîte mail
    const sendNotification = emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.notificationTemplateId,
      {
        from_name: formData.nom,
        from_email: formData.email,
        message: formData.message,
        'g-recaptcha-response': formData.captchaToken // Ajout du token reCAPTCHA
      }
    );

    // Envoyer un message automatique à l'utilisateur
    const sendAutoReply = emailjs.send(
      environment.emailjs.serviceId,
      environment.emailjs.autoReplyTemplateId,
      {
        to_name: formData.nom,
        to_email: formData.email
      }
    );

    // Exécuter les deux envois en parallèle
    return from(forkJoin([sendNotification, sendAutoReply]));
  }
}
