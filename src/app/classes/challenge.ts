import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class Challenge {
  private sanitizer: DomSanitizer;
  readonly id: number;
  readonly title: string;
  readonly html: string;
  readonly css: string;
  readonly js: string;

  constructor(props, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    this.id = props.id;
    this.title = props.title;
    this.html = props.html;
    this.css = props.css;
    this.js = props.js || '';
  }

  formatHtml(): SafeHtml {
    const html = `<style>${this.css}</style>` + this.html;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  injectJs(): void {
    if (this.js) {
      const script = document.createElement('script');

      try {
        script.appendChild(document.createTextNode(this.js));
      } catch (e) {
        script.text = this.js;
      }

      document.body.appendChild(script);
    }
  }
}
