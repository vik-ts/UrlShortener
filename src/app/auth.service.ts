import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  loggedIn = false;
  userName: string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.userName = this.jwtHelper.decodeToken(token).name;
      this.loggedIn = true;
    }
  }

  doLogin(user) {
    return this.http.post('/userlink/login/', user).map(res => {
      if (res['success']) {
        localStorage.setItem('token', res['token']);
        this.userName = this.jwtHelper.decodeToken(res['token']).name;
        this.loggedIn = true;
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
