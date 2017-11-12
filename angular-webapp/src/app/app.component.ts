import { Component } from '@angular/core';
import { AuthService } from './auth.service';

import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Assignment';

  constructor(public auth: AuthService) {
    auth.getAccessToken();
  }
}
