import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnDestroy {
  private challenge: Challenge;
  private sub: Subscription;

  constructor(
    private challengeList: ChallengeListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getChallenge();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getChallenge(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const challengeId = parseInt(params.get('id'), 10);
      this.challenge = this.challengeList.getById(challengeId);
    });
  }
}
