import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

  results: string[];

  constructor(public authHttp: AuthHttp, public auth: AuthService) { }

  ngOnInit() {
  }

  getThing() {

    this.auth.getAccessToken().then(
      () => {
        this.authHttp.get('http://localhost:8080/tasks')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
      }
    );

  }

  create(): void {
    const body = {name: 'Brad'};

    // this.http
    //   .post('http://localhost:8080/email', body, {
    // headers: new Headers().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qUkRSVVU1T0RsRU9UaEdSalU1UWtORk0wUTBRMEpGTURaRFJrVkdOekZGUmtVd1FrUTJSQSJ9.eyJpc3MiOiJodHRwczovL2x0cHJvLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJiRzh5ejdVVms5MGRlTU1ha0hYYXNYYndoVzZVMUFzREBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9lYXN5LWFzc2lnbm1lbnQuY29tIiwiaWF0IjoxNTEwMzQ4OTc4LCJleHAiOjE1MTA0MzUzNzgsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.oixM2Uh9JkR5ljX4aylxnFELpE633g05_IA9-GafQuTOUgdo5LMC1ltSif7fcLWWPrOaKhbCMfP1T35-0J6q0G0h6Eqh2-N5rpwAuzsSFdxPmBJJC9zlJS0rkeYHZC_fH6sqa6rTfiHnzaoh-KCGxqspxkMAZn6pGMqJCAFKTt4hYrDZZXNRe3dO0e1C6R5Ki8bmF0KUEboSmRmBOzDzcDrcHG3_CXzG-TPPIHWH2x64nnQrxHM-l-U2KS_0-4Umqrz7bvyU-0nOVCVeLcvqnvmUlboEUaeHagnbsAi5SZRw4LKEPQukYPa3HagGGMuvEp1JXT4ER_tK-Vuoswh1cg')})
    //   .subscribe(data => {
    //   // Read the result field from the JSON response.
    //   this.results = data['results'];);
    // }
    // console.log(results);

  }
}
