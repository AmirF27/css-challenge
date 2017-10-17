import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpRequest
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

  request(first: string|HttpRequest<any>, url?: string, options: any = {}): Observable<any> {
    if (!this.socialAuth.authenticated) {
      this.router.navigate(['login']);
      return Observable.empty();
    }

    options.headers = this.setHeaders(options.headers || new HttpHeaders());

    if (first instanceof HttpRequest) {
      return super.request(first);
    } else {
      return super.request(first, url, options);
    }
  }

  post(url: string, body: any|null, options: any = {}): Observable<any> {
    options.body = body;

    return this.request('POST', url, options);
  }

  put(url: string, body: any|null, options: any = {}): Observable<any> {
    options.body = body;

    return this.request('PUT', url, options);
  }

  private setHeaders(headers: HttpHeaders): HttpHeaders {
    headers = headers.set('Authorization', `Bearer ${this.socialAuth.getToken()}`);

    return headers;
  }
}
