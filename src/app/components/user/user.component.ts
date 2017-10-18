import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { User } from '../../classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {}

  getUser(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      let query = new HttpParams();
      query = query.set('username', params.get('username'));

      this.http
        .get('/api/user', { params: query })
        .subscribe(
          (res: HttpResponse<any>) => {
            this.user = new User({
              username: res['github']['username'],
              name: res['github']['displayName'],
              visible: res['settings']['profileVisible'],
              challengesCompleted: res['challengesCompleted'] || []
            });
          }
        );
    });
  }
}
