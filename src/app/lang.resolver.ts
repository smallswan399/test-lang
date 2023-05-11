import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LangResolver implements Resolve<string> {
  constructor(private translocoService: TranslocoService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> | Promise<string> | string {
    let lang = route.params['lang'];
    if (lang === 'en' || lang === 'es') {
      this.translocoService.setActiveLang(lang);
    } else {
      lang = this.translocoService.getDefaultLang();
      this.translocoService.setActiveLang(lang);
    }
    return lang;
  }
}