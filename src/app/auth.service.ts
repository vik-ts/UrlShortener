import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  doLogin(user) {
    return this.http.post('/userlink/login/', user).map(res => {
      if (res['success']) {
        this.loggedIn = true;
        localStorage.setItem('token', res['token']);
        setTimeout(() => {
          this.router.navigate(['/info-user']);
          },
        1500);
      }
      return res;
    });
  }

  doLogout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  mustLogin() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
