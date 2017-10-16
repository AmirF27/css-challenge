import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_ITEM = 'token';
const PROFILE_ITEM = 'profile';

@Injectable()
export class SocialAuthService {
  constructor(private router: Router) { }

  login(authUrl): void {
    const popup = window.open(authUrl);

    (popup as any).onAuthCallback = (token, profile) => {
      popup.close();
      window.focus();
      this.setSession(token, profile);
    };

    popup.focus();
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  private setSession(token: any, profile: any): void {
    localStorage.setItem(TOKEN_ITEM, token);
    localStorage.setItem(PROFILE_ITEM, profile);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_ITEM);
    localStorage.removeItem(PROFILE_ITEM);
  }
}
