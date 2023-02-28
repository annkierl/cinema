import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from './user-data.service';
import { InitialUserData, User } from './user-initial';

@Injectable({
  providedIn: 'root',
})
export class UserDataStateService {
  private userData$$ = new BehaviorSubject<User>(InitialUserData);
  private userDataHttpService = inject(UserDataService);

  get userData$() {
    return this.userData$$.asObservable();
  }

  getUserDataUpdateState() {
    this.userDataHttpService.getUserData().subscribe(val => this.userData$$.next(val));
  }
}
