import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, EventType, Route, Router } from '@angular/router';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { Observable, combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lang$: Observable<string>;
  langLinkSwitcher$: Observable<string[]>;
  defaultLang: string;
  languages: string[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService) {
    this.defaultLang = this.translocoService.getDefaultLang();
    this.languages = <string[]>this.translocoService.getAvailableLangs();
    this.lang$ = this.translocoService.langChanges$;
    // this
    this.langLinkSwitcher$ = combineLatest([
      this.router.events.pipe(filter(event => event.type === EventType.ActivationEnd)),
      this.translocoService.langChanges$
    ]).pipe(
      map(([_, currentLang]) => {
        const segments = (<ActivationEnd>_).snapshot.root.children.length ? this.router.routerState.snapshot.root.children[0].url : [];
        const isUrlDefault = !segments[0] || (segments[0].path !== 'en' && segments[0].path !== 'es');
        if (isUrlDefault && currentLang === this.defaultLang) {
          return ['es', ...segments.map(s => s.path)];
        }
        if (!isUrlDefault && currentLang !== this.defaultLang) {
          let result = segments.slice(1, segments.length).map(s => s.path);
          result = result.length ? result : [''];
          return result;
        }
        if (!isUrlDefault && currentLang === this.defaultLang) {
          return ['es', ...segments.slice(1, segments.length).map(s => s.path)];
        }
        if (isUrlDefault && currentLang !== this.defaultLang) {
          return [currentLang, ...segments.map(s => s.path)];
        } else {
          throw new Error('Unknown error');
        }
      })
    );
  }

  ngOnInit() {
    console.log(this.router.routerState.snapshot.root.children[0]?.url);
  }


  changeLanguage() {
    // let lang = this.translocoService.getActiveLang();
    // lang = lang === 'en' ? 'es' : 'en';
    const segments = this.router.routerState.snapshot.root.children[0].url;
    console.log(segments);
    // if (segments[0]) {
    //   // homepage, just navigate to the next lang
    //   this.router.
    // }
  }
  title = 'test-lang';
}
