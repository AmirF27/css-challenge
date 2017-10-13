import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChallengeListService } from './challenge-list.service';

describe('ChallengeListService', () => {
  const html = {
    CHALLENGE_1: '<p>Challenge 1</p>',
    CHALLENGE_2: '<p>Challenge 2</p>'
  };
  const CSS = 'p { color: blue; }';

  const challenges = [
    {
      id: 1,
      title: '1',
      html: html.CHALLENGE_1,
      css: CSS,
      js: ''
    },
    {
      id: 2,
      title: '2',
      html: html.CHALLENGE_2,
      css: CSS,
      js: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeListService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([ChallengeListService], (challengeList: ChallengeListService) => {
    expect(challengeList).toBeTruthy();
  }));

  it('should return correct challenge', inject([ChallengeListService], (challengeList: ChallengeListService) => {
    challengeList.challenges = challenges;

    const id = 1;
    const challenge = challengeList.getById(id);

    expect(challenge.id).toBe(id);
    expect(challenge.html).toBe(html[`CHALLENGE_${id}`]);
  }));

  it('should return null if challenge was not found', inject([ChallengeListService], (challengeList: ChallengeListService) => {
    challengeList.challenges = challenges;

    const id = 0;
    const challenge = challengeList.getById(id);

    expect(challenge).toBe(null);
  }));
});
