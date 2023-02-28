import { inject, Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanMatch {
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);

  canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.pipe(tap(val => console.log(val.User.role, 'hej')));
    return this.store
      .select(store => store.User)
      .pipe(
        filter(accountType => accountType !== null),

        switchMap(result => {
          if (result.role !== 'admin') {
            this.router.navigate(['/shows/0']);
          }
          return of(result.role === 'admin');
        })
      );
  }
}
