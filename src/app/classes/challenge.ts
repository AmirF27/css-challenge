export class Challenge {
  readonly id: number;
  readonly title: string;
  readonly html: string;
  readonly css: string;
  readonly js: string;

  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.html = props.html;
    this.css = props.css;
    this.js = props.js || '';
  }

  formatHtml(): string {
    return `<style>${this.css}</style>${this.html}`;
  }

  injectJs(): void {
    if (!this.js) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';

    try {
      script.appendChild(document.createTextNode(this.js));
    } catch (e) {
      script.text = this.js;
    }

    document.body.appendChild(script);
  }
}
