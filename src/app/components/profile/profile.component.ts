import { Component } from '@angular/core';

import { AuthHttp } from '../../classes/auth-http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  appearOnLeaderboard = true;
  profileVisible = true;

  constructor(
    private authHttp: AuthHttp
  ) { }

  saveSettings(): void {
    const body = {
      appearOnLeaderboard: this.appearOnLeaderboard,
      profileVisible: this.profileVisible
    };

    this.authHttp
      .put('/api/user', body)
      .subscribe(console.log);
  }
}
