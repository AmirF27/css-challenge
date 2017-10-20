import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class SocialAuthService {
  authUrl: string;
  redirectUrl: string;
  private popup: Window;

  readonly tokenItem = 'token';
  readonly profileItem = 'profile';

  constructor(
    private router: Router
  ) { }

  login(authUrl): void {
    this.authUrl = authUrl;
    this.openPopup();

    const listener = (event: MessageEvent) => {
      // Make sure the message can be trusted (came from the same origin)
      if (event.origin.indexOf(window.location.hostname) >= 0) {
        window.removeEventListener('message', listener);
        this.popup.close();
        window.focus();
        this.setSession(event.data.token, event.data.profile);
        this.router.navigate([this.redirectUrl || '']);
      }
    };

    window.addEventListener('message', listener);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['']);
  }

  isCurrentUser(username: string): boolean {
    const profile = JSON.parse(localStorage.getItem('profile'));

    return profile
      ? profile.github.username === username
      : false;
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
    this.popup = window.open(this.authUrl);
    this.popup.document.body.textContent = 'Authenticating...';
    this.popup.focus();
  }

  get token(): string {
    return localStorage.getItem(this.tokenItem);
  }

  get profile(): any {
    return JSON.parse(localStorage.getItem(this.profileItem));
  }

  get authenticated(): boolean {
    return tokenNotExpired(this.tokenItem);
  }
}
