import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { Challenge } from '../../classes/challenge';

import { ChallengeComponent } from './challenge.component';
import { ChallengeListService } from '../../services/challenge-list/challenge-list.service';

describe('ChallengeComponent', () => {
  let fixture: ComponentFixture<ChallengeComponent>;
  let component: ChallengeComponent;
  let compiled: HTMLElement;
  const activatedRouteStub = new ActivatedRouteStub();
  let sanitizer: DomSanitizer;

  const challengeListStub = {
    challenge: {
      id: 1,
      title: '1',
      html: '<span class="stub">Test</span>',
      css: '.stub { color: orange; }'
    },
    getById(id) {
      if (this.challenge.id === id) {
        return new Challenge(this.challenge, sanitizer);
      } else {
        return null;
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeComponent],
      providers: [
        { provide: ChallengeListService, useValue: challengeListStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    fixture = TestBed.createComponent(ChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    sanitizer = domSanitizer;
  }));

  it('should be created', () => {
    fixture = TestBed.createComponent(ChallengeComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('challenge was found', () => {
    beforeEach(inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
      activatedRouteStub.testParamMap = { id: 1 };
      fixture = TestBed.createComponent(ChallengeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      sanitizer = domSanitizer;
    }));

    it('should display expected HTML', () => {
      const elem = compiled.querySelector('div span');
      expect(elem).toBeTruthy();
      expect(elem.innerHTML).toBe('Test');
    });

    it('should contain a style element', () => {
      expect(compiled.querySelector('div style')).toBeTruthy();
    });

    it('should have orange text color', () => {
      const elem = compiled.querySelector('div span');
      const color = window.getComputedStyle(elem).getPropertyValue('color');
      expect(color).toBe('rgb(255, 165, 0)');
    });
  });

  describe('challenge was not found', () => {
    beforeEach(inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
      activatedRouteStub.testParamMap = { id: 0 };
      fixture = TestBed.createComponent(ChallengeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      sanitizer = domSanitizer;
    }));

    it('should display an error message', () => {
      expect(compiled.querySelector('div').textContent).toBe(component.notFoundMessage);
    });
  });
});
