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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('/userlink/linkcreate/').subscribe(data => {
    this.links = data;
    });
  }

  getSumClicks(): number {
    let sum = 0;
    if (this.links) {
      for (let i = 0; i < this.links.length; i++) {
        sum += this.links[i].click;
      }
    }
    return sum;
  }
}
