import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent }   from './create/create.component';
import { HomeComponent }   from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
