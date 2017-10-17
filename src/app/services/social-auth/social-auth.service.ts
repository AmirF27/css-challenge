import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SocialAuthService {
  authUrl: string;
  private popup: Window;

  readonly tokenItem = 'token';
  readonly profileItem = 'profile';

  constructor(
    @Inject(Window) private window: Window,
    private router: Router
  ) { }

  login(authUrl): void {
    this.authUrl = authUrl;
    this.openPopup();

    const listener = (event: MessageEvent) => {
      // Make sure the message can be trusted (came from the same origin)
      if (event.origin.indexOf(this.window.location.hostname) >= 0) {
        this.window.removeEventListener('message', listener);
        this.popup.close();
        this.window.focus();
        this.setSession(event.data.token, event.data.profile);
      }
    };

    this.window.addEventListener('message', listener);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenItem);
  }

  private setSession(token: string, profile: string): void {
    localStorage.setItem(this.tokenItem, token);
    localStorage.setItem(this.profileItem, profile);
  }

  private clearSession(): void {
    localStorage.removeItem(this.tokenItem);
    localStorage.removeItem(this.profileItem);
  }

  private openPopup(): void {
    this.popup = this.window.open(this.authUrl);
    this.popup.document.body.textContent = 'Authenticating...';
    this.popup.focus();
  }
}
