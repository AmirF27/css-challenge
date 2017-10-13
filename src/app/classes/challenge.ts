import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class Challenge {
  id: number;
  title: string;
  private html: string;
  private css: string;
  js: string;
  private sanitizer: DomSanitizer;

  constructor(props, sanitizer: DomSanitizer) {
    this.id = props.id;
    this.title = props.title;
    this.html = props.html;
    this.css = props.css;
    this.js = props.js || '';
    this.sanitizer = sanitizer;
  }

  formatHtml(): SafeHtml {
    const html = `<style>${this.css}</style>` + this.html;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
