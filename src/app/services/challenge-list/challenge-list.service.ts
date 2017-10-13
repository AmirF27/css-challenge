import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Challenge } from '../../classes/challenge';
import challenges from '../../data/challenges';

@Injectable()
export class ChallengeListService {
  private challenges: any[] = challenges;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  getById(id: number): Challenge {
    const challenge = this.challenges.find(challenge => challenge.id === id);

    return new Challenge(challenge, this.sanitizer);
  }
}
