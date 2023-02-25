// import { inject, Injectable } from '@angular/core';
// import { CanMatch, Router, UrlTree } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { filter, Observable, of, switchMap } from 'rxjs';
// import { AppState } from '../../home';
// import { selectAccountType } from '../store/user.selectors';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements CanMatch {
//   private store = inject<Store<AppState>>(Store);
//   private router = inject(Router);

//   canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.store.select(selectAccountType).pipe(
//       filter(accountType => accountType !== null),
//       switchMap(result => {
//         return of(result === 'admin');
//       })
//     );
//   }
// }
