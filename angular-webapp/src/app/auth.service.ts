import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AUTH_CONFIG } from './auth0-variables';
import { tokenNotExpired } from 'angular2-jwt';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService  {

  auth0 = new auth0.WebAuth({
    clientID: 'GvzwgsZQbzYfAlvEu3HYb8TFq3ysC5Bb',
    domain: 'ltpro.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    audience: 'https://easy-assignment.com',
    scope: 'openid'
  });

  settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ltpro.eu.auth0.com/oauth/token",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "data": "{\"client_id\":\"bG8yz7UVk90deMMakHXasXbwhW6U1AsD\",\"client_secret\":\"PoQN0-InO_w2W3rResTydOhLC4MyO5062GdSWlXCJJ12MmXxcZh4cZSC30e2dVjG\",\"audience\":\"https://easy-assignment.com\",\"grant_type\":\"client_credentials\"}"
  }


  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  getAccessToken(): void {

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

        var headers = new Headers();
        headers.append('content-type': 'application/json');

        this.http
        .post('https://ltpro.eu.auth0.com/oauth/token',
        body, {
          headers: headers
        })
        .subscribe(data => {
          const expiresAt = JSON.stringify((data.expires_in * 1000) + new Date().getTime());
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('expires_in', expiresAt);
          console.log(localStorage);
          resolve();
        }, error => {
          console.log(error);
          reject();
        });
      }


    });
    return promise;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    console.log(localStorage);
  }


}
