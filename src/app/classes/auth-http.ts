import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { SocialAuthService } from '../services/social-auth/social-auth.service';

@Injectable()
export class AuthHttp extends HttpClient {
  constructor(
    handler: HttpHandler,
    private router: Router,
    private socialAuth: SocialAuthService
  ) {
    super(handler);
  }

  post(url: string, body: any|null, options: any = {}): Observable<any> {
    if (!this.socialAuth.authenticated) {
      this.router.navigate(['login']);
      return Observable.empty();
    }

    options.headers = this.setHeaders(options.headers || new HttpHeaders());

    return super.post(url, body, options);
  }

  private setHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.set('Authorization', `Bearer ${this.socialAuth.getToken()}`);

    return headers;
  }
}
