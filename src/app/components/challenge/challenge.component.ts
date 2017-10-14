import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly notFoundMessage = 'Challenge not found.';

  private challenge: Challenge;
  private challengeHtml: string;
  private sub: Subscription;

  constructor(
    private challengeList: ChallengeListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getChallenge();
  }

  ngAfterViewChecked(): void {
    if (this.challenge) {
      this.challenge.injectJs();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getChallenge(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const challengeId = parseInt(params.get('id'), 10);
      this.challenge = this.challengeList.getById(challengeId);

      if (this.challenge) {
        this.challengeHtml = this.challenge.formatHtml();
      }
    });
  }
}
