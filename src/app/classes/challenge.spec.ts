import { Challenge } from './challenge';

const TEXT = 'test'
const CSS_CLASS = 'test-element';
const JS = `$(".${CSS_CLASS}").text("${TEXT}");`;

describe('ChallengeClass', () => {
  let challenge: Challenge;

  const challengeData = {
    id: 1,
    title: '1',
    html: `<p class="${CSS_CLASS}"></p>`,
    css: 'p { color: black; }',
    js: JS
  };

  beforeAll(() => {
    challenge = new Challenge(challengeData);
  });

  describe('#formatHtml', () => {
    let html;

    beforeAll(() => {
      html = challenge.formatHtml();
    });

    it('return value should have opening style tag', () => {
      const index = html.indexOf('<style>');
      expect(index).toBeGreaterThanOrEqual(0);
    });

    it('return value should have closing style tag', () => {
      const index = html.indexOf('</style>');
      expect(index).toBeGreaterThanOrEqual(0);
    });

    it('HTML should come after CSS', () => {
      const cssIndex = html.indexOf('</style>');
      const htmlIndex = html.indexOf('<p ');
      expect(htmlIndex).toBeGreaterThan(cssIndex);
    });
  });

  describe('#injectJs', () => {
    it('should inject script at bottom of body', () => {
      const oldScriptsLength = document.getElementsByTagName('script').length;
      challenge.injectJs();
      const newScripts = document.getElementsByTagName('script');
      const lastScript = newScripts[newScripts.length - 1];

      expect(newScripts.length).toBe(oldScriptsLength + 1);
      expect(lastScript.textContent).toBe(JS);
    });

    it('should properly execute injected script', () => {
      const body = document.querySelector('body');
      const parser = new DOMParser();
      const html = parser.parseFromString(challenge.html, 'text/xml').firstChild;
      body.insertBefore(html, body.firstChild);
      challenge.injectJs();

      const elem = document.querySelector(`.${CSS_CLASS}`);
      expect(elem.textContent).toBe(TEXT);
    });
  });
});
