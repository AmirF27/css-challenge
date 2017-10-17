import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RouterStub } from '../../../testing/router-stubs';
import { SocialAuthService } from './social-auth.service';

describe('SocialAuthService', () => {
  // Fake data simulating what we would get on actual login
  const data = {
    token: 'token',
    profile: {
      _id: '11111111',
      github: {
        id: 1,
        username: 'user',
        displayName: 'Some User'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocialAuthService,
        { provide: Router, useClass: RouterStub },
        { provide: Window, useValue: window }
      ]
    });
  });

  it('should be created',
    inject([SocialAuthService], (socialAuth: SocialAuthService) => {
      expect(socialAuth).toBeTruthy();
  }));

  describe('#login', () => {
    it('should store token and user profile in local storage', (done) => {
      inject([SocialAuthService], (socialAuth: SocialAuthService) => {
        socialAuth.login('');
        window.postMessage({
          token: data.token,
          profile: JSON.stringify(data.profile)
        }, '*');

        window.addEventListener('message', () => {
          const token = localStorage.getItem(socialAuth.tokenItem);
          const profile = JSON.parse(localStorage.getItem(socialAuth.profileItem));

          console.log(token);

          expect(token).toBe(data.token);
          expect(profile).toEqual(data.profile);

          done();
        });
      })();
    });
  });

  describe('#logout', () => {
    it('should remove token and user profile from local storage',
      inject([SocialAuthService], (socialAuth: SocialAuthService) => {
        let token = localStorage.getItem(socialAuth.tokenItem);
        let profile = JSON.parse(localStorage.getItem(socialAuth.profileItem));

        expect(token).toBe(data.token);
        expect(profile).toEqual(data.profile);

        socialAuth.logout();

        token = localStorage.getItem(socialAuth.tokenItem);
        profile = JSON.parse(localStorage.getItem(socialAuth.profileItem));

        expect(token).toBeNull();
        expect(profile).toBeNull();
    }));

    it('should redirect to /',
      inject([SocialAuthService, Router],
        (socialAuth: SocialAuthService, router: Router) => {

        const spy = spyOn(router, 'navigate');
        socialAuth.logout();
        const nav = spy.calls.first().args[0];

        expect(nav).toEqual(['']);
    }));
  });
});
