import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  links: any;
  click = 0;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('/userlink/linkcreate/').subscribe(data => {
    this.links = data;
    this.click = this.click + data['click'];
    });
  }
}
