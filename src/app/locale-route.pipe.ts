import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'localeRoute'
})
export class LocaleRoutePipe implements PipeTransform {

  constructor(private translocoService: TranslocoService) { }

  transform(route: string[]): Observable<string[]> {
    return this.translocoService.langChanges$.pipe(
      map(active => {
        const defaultLang = this.translocoService.getDefaultLang();
        if (active !== defaultLang) {
          return route.length ? [active, ...route.filter(r => r.length)] : [active];
        }
        return route;
      })
    );
  }

}
