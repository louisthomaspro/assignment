import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// auth0
// import { AuthService } from './auth/auth.service';
// import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

// material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule} from '@angular/material';
// gesture
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    HttpModule,
    HttpClientModule,
    MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
