import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { SocialAuthService } from '../../services/social-auth/social-auth.service';
import { AuthHttp } from '../../classes/auth-http';
import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnDestroy, AfterViewChecked {
  readonly notFoundMessage = 'Challenge not found.';

  private sub: Subscription;

  challenge: Challenge;
  challengeHtml: string;
  previousChallenge: number;
  nextChallenge: number;
  confirmation: string;

  formData = {
    links: {
      code: '',
      live: ''
    }
  };

  constructor(
    private challengeList: ChallengeListService,
    private socialAuth: SocialAuthService,
    private route: ActivatedRoute,
    private authHttp: AuthHttp
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
      this.confirmation = '';
      if (this.challenge) {
        this.challengeHtml = this.challenge.formatHtml();
        if (this.challenge.id > 1) {
          this.previousChallenge = this.challenge.id - 1;
        }
        if (this.challenge.id < 100) {
          this.nextChallenge = this.challenge.id + 1;
        }
      }
    });
  }

  submitLinks(): void {
    const body = {
      id: this.challenge.id,
      title: this.challenge.title,
      links: this.formData.links
    };

    this.authHttp
      .put('/api/user/challenge', body)
      .subscribe((result) => {
        if (result === 'success') {
          this.formData.links.code = '';
          this.formData.links.live = '';
          this.confirmation = 'Challenge submitted.';
        } else {
          this.confirmation = 'Submission failed.';
        }
      });
  }
}
