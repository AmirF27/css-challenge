import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { ChallengeListService } from './services/challenge-list/challenge-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private challengeHtml: SafeHtml;

  constructor(
    private challengeList: ChallengeListService
  ) {}

  ngOnInit() {
    this.displayChallenge(1);
  }

  displayChallenge(id: number): void {
    this.challengeHtml = this.challengeList.getById(id).formatHtml();
  }
}
