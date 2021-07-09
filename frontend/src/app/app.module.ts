import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConventionsListComponent } from './conventions-list/conventions-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PartnersComponent } from './partners/partners.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ClaimsComponent } from './claims/claims.component';
import { LoginComponent } from './login/login.component';
import { ManageClaimsComponent } from './manage-claims/manage-claims.component';

@NgModule({
  declarations: [
    AppComponent,
    ConventionsListComponent,
    PartnersComponent,
    ProfileComponent,
    ClaimsComponent,
    LoginComponent,
    ManageClaimsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
