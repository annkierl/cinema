import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { UserState } from '../../home/AppUser.interface';

export const store = inject<Store<UserState>>(Store);
export const selectAuth = (state: AppState) => state.User;
