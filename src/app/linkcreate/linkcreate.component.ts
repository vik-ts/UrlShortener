import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-linkcreate',
  templateUrl: './linkcreate.component.html',
  styleUrls: ['./linkcreate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinkcreateComponent implements OnInit {

  link = {};
  message = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
    createLink() {
    this.http.post('/userlink/linkcreate/', this.link)
      .subscribe(res => {
        this.message = res['message'];
        }, (err) => {
         console.log(err);
         this.message = err['message'];
        }
      );
  }
}
