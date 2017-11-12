import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent }   from './create/create.component';
import { HomeComponent }   from './home/home.component';
import { ListForUserComponent } from './list-for-user/list-for-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // define homepage
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'list/:list_hash/:user_hash', component: ListForUserComponent },
  { path: '**', redirectTo: '' } // redirect bad routes
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
