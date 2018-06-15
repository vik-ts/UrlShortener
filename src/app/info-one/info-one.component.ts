import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-one',
  templateUrl: './info-one.component.html',
  styleUrls: ['./info-one.component.css']
})

export class InfoOneComponent implements OnInit {

  link: {};

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getLinkDetail(this.router.snapshot.params['id']);
  }

  getLinkDetail(id) {
    this.http.get('/userlink/info-one/' + id).subscribe(data => {
      this.link = data;
    });
  }
}

