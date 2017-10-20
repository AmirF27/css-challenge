import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { User } from '../../classes/user';
import { SocialAuthService } from '../../services/social-auth/social-auth.service';

@Injectable()
export class UserService {
  baseUrl = '/api/user';

  constructor(
    private http: HttpClient,
    private socialAuth: SocialAuthService
  ) { }

  getUser(username: string): Promise<User> {
    let query = new HttpParams();
    query = query.set('username', username);

    if (this.socialAuth.isCurrentUser(username)) {
      return Promise.resolve(this.createUserInstance(this.socialAuth.profile));
    }

    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseUrl, { params: query })
        .subscribe(
          (res: HttpResponse<any>) => {
            resolve(this.createUserInstance(res));
          },
          reject
        );
    });
  }

  getLeaderboard(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseUrl}/leaderboard`)
        .subscribe(resolve, reject);
    });
  }

  getUserChallenges(): any[] {
    if (!this.socialAuth.authenticated) { return null; }

    const challenges = this.socialAuth.profile.challengesCompleted;

    return this.formatChallenges(challenges, false) as any[];
  }

  getUserChallengesAsMap(): Map<number, any> {
    if (!this.socialAuth.authenticated) { return null; }

    const challenges = this.socialAuth.profile.challengesCompleted;

    return this.formatChallenges(challenges, true) as Map<number, any>;
  }

  private createUserInstance(userData: any): User {
    return new User({
      username: userData['github']['username'],
      name: userData['github']['displayName'],
      visible: userData['settings']['profileVisible'],
      challengesCompleted: this.formatChallenges(userData['challengesCompleted']),
      isCurrentUser: this.socialAuth.isCurrentUser(userData['github']['username'])
    });
  }

  private formatChallengeDate(challenge: any): any {
    return {
      ...challenge,
      date: moment(challenge.date).format('MMM DD, YYYY')
    };
  }

  private formatChallenges(challenges: any[] = [], asMap: boolean = false): any[]|Map<number, any> {
    if (asMap) {
      challenges = challenges.map(challenge => [
        challenge.id,
        this.formatChallengeDate(challenge)
      ]);
      return new Map<number, any>(challenges);
    } else {
      return challenges.map(challenge => this.formatChallengeDate(challenge));
    }
  }
}
