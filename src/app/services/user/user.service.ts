import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../classes/user';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUser(username: string): Promise<User> {
    let query = new HttpParams();
    query = query.set('username', username);

    return new Promise((resolve, reject) => {
      this.http
        .get('/api/user', { params: query })
        .subscribe(
          (res: HttpResponse<any>) => {
            resolve(this.constructUserFromResponse(res));
          }
        );
    });
  }

  private constructUserFromResponse(res: HttpResponse<any>): User {
    return new User({
      username: res['github']['username'],
      name: res['github']['displayName'],
      visible: res['settings']['profileVisible'],
      challengesCompleted: res['challengesCompleted'] || []
    });
  }
}
