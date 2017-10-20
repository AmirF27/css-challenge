import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { LoginComponent } from './components/login/login.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserComponent } from './components/user/user.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'challenge/:id', component: ChallengeComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
