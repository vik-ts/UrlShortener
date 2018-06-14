import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linkcreate',
  templateUrl: './linkcreate.component.html',
  styleUrls: ['./linkcreate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinkcreateComponent implements OnInit {

  link = {};
  message = '';
  processing = true;
  regular = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
    createLink() {
    this.http.post('/userlink/linkcreate/', this.link)
      .subscribe(res => {
        this.message = res['message'];
      }, (err) => {
         console.log(err);
         this.message = err['message'];
        // this.regular = '/(https?:\/\/)?(wхъфырэчстьюa-z0-9_]{1,})?\/?([a-z0-9_-]{2,}\.[a-z]{2,6})?(\?[a-z0-9_]{2,}=[-0-9]{';
        }
      );
  }
}
