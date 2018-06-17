import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linkedit',
  templateUrl: './linkedit.component.html',
  styleUrls: ['./linkedit.component.css']
})

export class LinkeditComponent implements OnInit {

  link: {};
  message = '';

  constructor(private http: HttpClient, private router: ActivatedRoute, private rout: Router) { }

  ngOnInit() {
    this.getLink(this.router.snapshot.params.shortlink);
  }

  getLink(shortlink) {
    this.http.get('/userlink/info-one/' + shortlink).subscribe(data => {
      this.link = data;
    });
  }

  edit(shortlink) {
    this.http.put('/userlink/linkedit/' + shortlink, this.link)
      .subscribe(res => {
        this.message = res['message'];
        if (res['success']) {
          setTimeout(() => {
              this.rout.navigate(['/info-user']);
          },
          1500);
        }
        }, (err) => {
          console.log(err);
          this.message = err['message'];
        }
      );
  }
}
