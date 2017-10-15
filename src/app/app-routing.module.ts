import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ChallengeComponent } from './components/challenge/challenge.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'challenge/:id', component: ChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
