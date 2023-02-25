import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InitialUserData, User } from './user-initial';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData$$ = new BehaviorSubject<User>(InitialUserData);
  private http = inject(HttpClient);

  get userData$() {
    return this.userData$$.asObservable();
  }

  getUserData() {
    this.http.get<User>(`http://localhost:3000/users/2`).subscribe(val => this.userData$$.next(val));
  }
}
