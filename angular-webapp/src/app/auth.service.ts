import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { tokenNotExpired } from 'angular2-jwt';

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

@Injectable()
export class AuthService  {

  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  getAccessToken() {

    var promise = new Promise((resolve, reject) => {

      if (tokenNotExpired('access_token')) {
        resolve();
      } else {
        console.log("bad or expired token. Try refresh...");
        var body = {
          client_id: AUTH_CONFIG.client_id,
          client_secret: AUTH_CONFIG.client_secret,
          grant_type: AUTH_CONFIG.grant_type,
          audience: AUTH_CONFIG.audience
        }
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        this.http
        .post('https://ltpro.eu.auth0.com/oauth/token',
        body, {
          headers: headers
        })
        .subscribe(data => {
          const expiresAt = JSON.stringify((data['expires_in'] * 1000) + new Date().getTime());
          localStorage.setItem('access_token', data['access_token']);
          localStorage.setItem('expires_in', expiresAt);
          console.log(localStorage);
          resolve();
        }, error => {
          console.log("Incorrect user or no 'Access-Control-Allow-Origin'")

        });
      }


    });
    return promise;
  }

  public clearToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    console.log(localStorage);
  }


}
