import { TestBed, inject } from '@angular/core/testing';

import { ChallengeListService } from './challenge-list.service';

describe('ChallengeListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeListService]
    });
  });

  it('should be created', inject([ChallengeListService], (service: ChallengeListService) => {
    expect(service).toBeTruthy();
  }));
});
