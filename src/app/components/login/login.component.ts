import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '../../services/social-auth/social-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private socialAuth: SocialAuthService) { }

  ngOnInit() {
  }
}
