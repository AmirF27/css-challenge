import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChallengeListService } from './services/challenge-list/challenge-list.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ChallengeListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
