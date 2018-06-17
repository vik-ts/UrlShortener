import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user = {};
  message = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  findUser() {
      this.auth.doLogin(this.user)
      .subscribe(res => {
        this.message = res['message'];
        }, (err) => {
          console.log(err);
          this.message = err['message'];
        }
      );
  }
}
