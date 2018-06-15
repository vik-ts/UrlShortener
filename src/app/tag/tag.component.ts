import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  links: {};

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getLinks(this.router.snapshot.params.tagone);
  }

  getLinks(tagone) {
      this.http.get('/userlink/tag/' + tagone).subscribe(data => {
      this.links = data;
    });
  }
}
