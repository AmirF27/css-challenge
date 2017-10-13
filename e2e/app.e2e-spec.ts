import { CssChallengePage } from './app.po';

describe('css-challenge App', () => {
  let page: CssChallengePage;

  beforeEach(() => {
    page = new CssChallengePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
