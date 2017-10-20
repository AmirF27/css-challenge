import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SocialAuthService } from '../services/social-auth/social-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private socialAuth: SocialAuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.checkLogin(state.url);
  }

  checkLogin(redirectUrl): boolean {
    if (this.socialAuth.authenticated) { return true; }

    this.socialAuth.redirectUrl = redirectUrl;

    this.router.navigate(['login']);

    return false;
  }
}
