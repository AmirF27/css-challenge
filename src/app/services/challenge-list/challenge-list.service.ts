import { Injectable } from '@angular/core';

import { Challenge } from '../../classes/challenge';
import challenges from '../../data/challenges';

@Injectable()
export class ChallengeListService {
  private _challenges: any[] = challenges;

  // mostly for testing purposes
  set challenges(challenges: any[]) {
    this._challenges = challenges;
  }

  getById(id: number): Challenge {
    const challenge = this._challenges.find(challenge => challenge.id === id);

    return challenge ? new Challenge(challenge) : null;
  }
}
