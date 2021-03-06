import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  links: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('/userlink/info/').subscribe(data => {
    this.links = data;
    });
  }
}
