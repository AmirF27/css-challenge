import { Component, OnInit } from '@angular/core';

import { Challenge } from '../../classes/challenge';
import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  challenges: Challenge[];
  userChallenges: Map<number, any>;

  constructor(
    private challengeList: ChallengeListService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getChallenges();
  }

  getChallenges(): void {
    this.challenges = this.challengeList.challenges;
    this.userChallenges = this.userService.getUserChallengesAsMap();
  }
}
