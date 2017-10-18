import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthHttp } from './classes/auth-http';
import { ChallengeListService } from './services/challenge-list/challenge-list.service';
import { SocialAuthService } from './services/social-auth/social-auth.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { AppComponent } from './app.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeComponent,
    SafeHtmlPipe,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ChallengeListService,
    SocialAuthService,
    AuthHttp,
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
