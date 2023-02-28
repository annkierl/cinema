import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { User } from './user-initial';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private http = inject(HttpClient);

  getUserData() {
    return this.http.get<User>(`http://localhost:3000/users/2`);
  }
}
