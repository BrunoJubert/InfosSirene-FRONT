import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Importer MessageService


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public _auth: AuthService, private _router: Router, public _messageService: MessageService)
  {}

  ngOnInit() { 
    if (localStorage.getItem('bearerToken')) {
      this._auth.isConnected = true;

      this.getUserInfo();
    } 
    console.log('header bearerToken',localStorage.getItem('bearerToken'));

    this._auth.user$.subscribe((user) => {
      if (user) {
        this._auth.isConnected = true;
        this._auth.setUserInfo(user.firstName);}
    });
  }

  getUserInfo() {
    this._auth.getUser().subscribe(
      (userInfo: any) => {
        this._auth.setUserInfo(userInfo.firstName);
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }
  navigateTo(url: string) {
    this._router.navigate([url]);
  }


  logout() {
    this._auth.logout();
    this._router.navigate(['/home']);
  }
}
