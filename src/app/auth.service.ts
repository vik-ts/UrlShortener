import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  doLogin(user) {
    return this.http.post('/userlink/login/', user);
  }

}
