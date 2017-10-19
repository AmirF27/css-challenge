import { Component } from '@angular/core';

import { AuthHttp } from '../../classes/auth-http';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
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
