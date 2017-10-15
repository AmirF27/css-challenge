import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ChallengeListService } from './services/challenge-list/challenge-list.service';

import { AppComponent } from './app.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeComponent,
    SafeHtmlPipe,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChallengeListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
