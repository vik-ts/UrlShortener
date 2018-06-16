import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-openlink',
  templateUrl: './openlink.component.html',
  styleUrls: ['./openlink.component.css']
})
export class OpenlinkComponent implements OnInit {

  link = {};
  message = '';

  constructor(private http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getLink(this.router.snapshot.params.shortlink);
  }

  getLink(shortlink) {
    this.http.get('/userlink/openlink/' + shortlink).subscribe(data => {
      if (data['success'] === false) {
        this.message = 'Нет ссылок!';
      } else {
        this.link = data;
        this.message = 'Переадресация на ' + this.link['longlink'];
        window.location.href = 'http://' + this.link['longlink'];
      }
    });
  }
}
