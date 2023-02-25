import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '@core/env.token';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppState } from '../home/home.module';
import { LoginData } from './auth.interface';
import { userActions } from './store/user.action';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);
  private apiUrl = inject(API_URL);
  private tokenService = inject(TokenService);
  private url = '/login';

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.auth$$.asObservable();
  }

  logIn(email: string, password: string) {
    return this.http
      .post<LoginData>(this.apiUrl + this.url, {
        email: email,
        password: password,
      })
      .pipe(
        tap({
          next: res => {
            const { accessToken, user } = res;
            this.auth$$.next({ hasAuth: true });

            this.tokenService.saveToken(accessToken, user.role);
            this.store.dispatch(userActions.changeRole({ role: user.role, id: user.id }));
            console.log(user.role);
            if (user.role === 'user') {
              this.router.navigate(['/shows/0']);
            } else {
              this.router.navigate(['/admin']);
            }
          },
        })
      )
      .subscribe();
  }
  logout() {
    this.tokenService.removeToken();
    this.store.dispatch(userActions.changeRole({ role: '', id: NaN }));
    this.auth$$.next({ hasAuth: false });
    this.router.navigate(['/auth']);
  }
}
