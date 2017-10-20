import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService } from '../../services/social-auth/social-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private socialAuth: SocialAuthService
  ) { }

  ngOnInit() {
    if (this.socialAuth.authenticated) {
      this.router.navigate(['']);
    }
  }

  login(url: string): void {
    this.socialAuth.login('/auth/github');
  }
}
