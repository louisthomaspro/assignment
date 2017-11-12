import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth.service';

import {MatSnackBar} from '@angular/material';

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


  createList() {

    this.auth.getAccessToken().then(
      () => {
        this.authHttp.get('http://localhost:8080/tasks')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          let snackBarRef = this.snackBar.open('Check your mailbox', 'X', {
            duration: 5000
          });
        }, error => {
          console.log(error);
        });
      },
      () => {}
    );

  }

}
