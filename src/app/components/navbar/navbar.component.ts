import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '../../services/social-auth/social-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authenticated: boolean;

  constructor(
    public socialAuth: SocialAuthService
  ) {
    this.authenticated = socialAuth.authenticated;
  }

  ngOnInit() {

  }

  logout(): void {
    this.socialAuth.logout();
  }
}
