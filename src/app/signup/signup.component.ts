import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  user = {};
  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveUser() {
    this.http.post('/userlink/signup/', this.user)
      .subscribe(res => {
        this.message = res['message'];
        setTimeout(() => {
          this.router.navigate(['/login']);
          },
        1500);
        }, (err) => {
          console.log(err);
          this.message = err['message'];
        }
      );
  }
}
