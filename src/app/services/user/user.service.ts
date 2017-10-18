import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

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

    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseUrl, { params: query })
        .subscribe(
          (res: HttpResponse<any>) => {
            resolve(this.constructUserFromResponse(res));
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

  private constructUserFromResponse(res: HttpResponse<any>): User {
    return new User({
      username: res['github']['username'],
      name: res['github']['displayName'],
      visible: res['settings']['profileVisible'],
      challengesCompleted: res['challengesCompleted'] || [],
      isCurrentUser: this.socialAuth.isCurrentUser(res['github']['username'])
    });
  }
}
