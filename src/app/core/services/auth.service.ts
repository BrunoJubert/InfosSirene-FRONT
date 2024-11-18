import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Importer MessageService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isConnected: boolean = false;
  base_url: string = environment.apiUrl;
  httpHeaders: HttpHeaders;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();
  userFirstName: string = '';

  constructor(private _http: HttpClient, private router: Router, private _messageService: MessageService) {
    this.httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    this.checkToken();
  }

  private checkToken() {
    const bearerToken = localStorage.getItem('bearerToken');
    if (bearerToken) {
      this.userSubject.next({ bearerToken });
      this.getUser().subscribe(
        (user: any) => {
          this.setUserInfo(user.firstName);
          this.isConnected = true;
        },
        (error) => {
          console.error('Erreur lors de la récupération des informations utilisateur', error);
          this.logout();
        }
      );
    }
  }

  createUser(data: any) {
    return this._http.post(this.base_url + '/user', data, { headers: this.httpHeaders });
  }

  getUser() {
    return this._http.get(this.base_url + '/me', { headers: this.httpHeaders });
  }

  login(data: any): Observable<any> {
    return this._http.post(this.base_url + '/login', data, { headers: this.httpHeaders }).pipe(
      tap((response: any) => {
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user);
          this.setUserInfo(response.user.firstName);
        }
        if (response.token) {
          localStorage.setItem('bearerToken', response.token);
        }
        this.isConnected = true;

      
      })
    );
  }

  logout() {
    localStorage.removeItem('bearerToken'); // Supprimer le token
    localStorage.removeItem('user'); // Supprimer les informations utilisateur
    this.isConnected = false;
    this.userFirstName = '';
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  updateProfile(data: any, id: number) {
    return this._http.put(this.base_url + '/user/' + id, data, { headers: this.httpHeaders }).pipe(
      tap((updatedUser: any) => {
        if (updatedUser && updatedUser.firstName) {
          this.setUserInfo(updatedUser.firstName);
          this.userSubject.next(updatedUser);
        }
      })
    );
  }

  setUserInfo(firstName: string) {
    this.userFirstName = firstName;
  }
}
