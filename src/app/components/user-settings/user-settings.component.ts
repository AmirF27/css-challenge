import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '../../services/social-auth/social-auth.service';
import { AuthHttp } from '../../classes/auth-http';
import { User } from '../../classes/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit{
  appearOnLeaderboard = true;
  profileVisible = true;
  user: User;
  confirmation: string;

  constructor(
    private authHttp: AuthHttp,
    private socialAuth: SocialAuthService
  ) {

  }
  ngOnInit() {
    this.user = this.socialAuth.profile;
    this.confirmation = '';
  }

  saveSettings(): void {
    const body = {
      appearOnLeaderboard: this.user.settings.appearOnLeaderboard,
      profileVisible: this.user.settings.profileVisible
    };
    this.socialAuth.setProfile(JSON.stringify(this.user));
    this.authHttp
      .put('/api/user', body)
      .subscribe((result) => {
        this.confirmation = 'Settings Saved';
      });
  }
}
