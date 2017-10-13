import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChallengeComponent } from './components/challenge/challenge.component';

const routes: Routes = [
  { path: 'challenge/:id', component: ChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
