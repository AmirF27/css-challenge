import { Component, OnInit} from '@angular/core';

import { Challenge } from '../../classes/challenge';
import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';
import { UserService } from '../../services/user/user.service';
import { SocialAuthService} from "../../services/social-auth/social-auth.service"
@Component({
  selector: 'app-home',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  challenges: Challenge[];
  userChallenges: Map<number, any>;

  constructor(
    private challengeList: ChallengeListService,
    private userService: UserService,
    public socialAuth: SocialAuthService
  ) { }

  ngOnInit() {
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
