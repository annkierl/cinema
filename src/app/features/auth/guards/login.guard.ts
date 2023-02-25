import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree, CanActivateFn } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanLoginGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.auth$.pipe(
      switchMap(result => {
        if (result.hasAuth) this.router.navigate(['/shows/0']);
        return of(!result.hasAuth);
      })
    );
  }
}

const Guard: CanActivateFn = route => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.auth$.pipe(
    switchMap(result => {
      if (result.hasAuth) router.navigate(['/shows/0']);
      return of(!result.hasAuth);
    })
  );
};
