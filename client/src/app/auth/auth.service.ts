import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  token: string;
  user: any;
  url = `${environment.apiUrl}/api/auth`;
  constructor(
    private router: Router,
    protected http: HttpClient
  ) {
    super(http);
    this.loadStorage();
  }
  loginEmailUser(user): Observable<any> {
    return this.post(this.url, user)
      .pipe(
        map((resp: any) => {
          this.saveLocalStorage(
            resp.id,
            resp.token,
            resp.user
          );
        })
      ).pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }
  logout(): void {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  saveLocalStorage(id: string, token: string, user: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }
  isLoggedIn(url: string): boolean {
    const isLogged = this.token.length > 5;
    if (!isLogged) {
      return false;
    } else {
      return true;
    }
  }
  private loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }
}
