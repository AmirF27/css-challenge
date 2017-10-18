import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getLeaderboard();
  }

  getLeaderboard(): void {
    this.userService.getLeaderboard()
      .then((leaderboard) => {
        this.leaderboard = leaderboard;
      })
      .catch(console.error)
  }
}
