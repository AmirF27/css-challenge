import {DoCheck, Component, OnInit} from '@angular/core';

import { Challenge } from '../../classes/challenge';
import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  challenges: Challenge[];
  userChallenges: Map<number, any>;

  constructor(
    private challengeList: ChallengeListService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getChallenges();
  }
  ngDoCheck() {
    this.getChallenges();
  }
  getChallenges(): void {
    this.challenges = this.challengeList.challenges;
    // this.userChallenges = this.userService.getUserChallengesAsMap();

    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile !== null && profile.github !== null) {
      this.userService.getUser(profile.github.username).then((user) => {
        this.userChallenges = this.userService.formatChallenges(user.challengesCompleted, true ) as Map<number, any>;
      });
    }


  }
}
