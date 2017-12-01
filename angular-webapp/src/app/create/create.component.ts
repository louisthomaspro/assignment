import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth.service';

import {MatSnackBar} from '@angular/material';
import { NgForm } from '@angular/forms';


import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

  constructor(public authHttp: AuthHttp, public auth: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createList(form: NgForm) {

    this.auth.getAccessToken().then(
      () => {

        var body = {
          url: "http://localhost:4200/list/list_hash/user_hash",
          mail: form.value.mailInput
        }

        this.authHttp.post('http://localhost:8080/list/create',
        body)
        .subscribe(data => {
          console.log(data);
          let snackBarRef = this.snackBar.open('Check your mailbox', 'X', {
            duration: 5000
          });
          form.reset();
        }, error => {
          console.log(error);
        });
      },
      () => {}
    );

  }

}
