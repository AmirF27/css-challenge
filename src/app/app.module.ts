import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthHttp } from './classes/auth-http';
import { ChallengeListService } from './services/challenge-list/challenge-list.service';
import { SocialAuthService } from './services/social-auth/social-auth.service';
import { UserService } from './services/user/user.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { AboutComponent} from './components/about/about.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserComponent } from './components/user/user.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ChallengesComponent } from './components/challenges/challenges.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ChallengeComponent,
    SafeHtmlPipe,
    NavbarComponent,
    LoginComponent,
    UserSettingsComponent,
    UserComponent,
    LeaderboardComponent,
    ChallengesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthHttp,
    ChallengeListService,
    SocialAuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
