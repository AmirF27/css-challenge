import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../classes/user';
import { UserService } from '../../services/user/user.service';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getUser(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.userService.getUser(params.get('username'))
        .then((user) => this.user = user)
        .catch(console.error);
    });
  }

  formatChallengeTitle(): string {
    const person = this.user.isCurrentUser
      ? 'you have '
      : `${this.user.username} has `;

    return `Challenges ${person} completed`;
  }
}
