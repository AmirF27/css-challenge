import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_ITEM = 'token';
const PROFILE_ITEM = 'profile';

@Injectable()
export class SocialAuthService {
  authUrl: string;
  private popup: Window;

  constructor(private router: Router) { }

  login(authUrl): void {
    this.authUrl = authUrl;
    this.openPopup();

    const listener = (event: MessageEvent) => {
      // Make sure the message can be trusted (came from the same origin)
      if (event.origin.indexOf(window.location.origin) >= 0) {
        window.removeEventListener('message', listener);
        this.popup.close();
        window.focus();
        this.setSession(event.data.token, event.data.profile);
      }
    };

    window.addEventListener('message', listener);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  private setSession(token: string, profile: string): void {
    localStorage.setItem(TOKEN_ITEM, token);
    localStorage.setItem(PROFILE_ITEM, profile);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_ITEM);
    localStorage.removeItem(PROFILE_ITEM);
  }

  private openPopup(): void {
    this.popup = window.open(this.authUrl);
    this.popup.document.body.textContent ='Authenticating...';
    this.popup.focus();
  }
}
