import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConventionsListComponent} from './conventions-list/conventions-list.component';
import {PartnersComponent} from './partners/partners.component';
import {ProfileComponent} from './profile/profile.component';
import {ClaimsComponent} from './claims/claims.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth-guard.service';
import {ManageClaimsComponent} from './manage-claims/manage-claims.component';

const routes: Routes = [
  {path: 'dashboard', component: ConventionsListComponent, canActivate: [AuthGuard]},
  {path: 'partners', component: PartnersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'claims', component: ClaimsComponent, canActivate: [AuthGuard]},
  {path: 'manage-claims', component: ManageClaimsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
