import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.module';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  providers: [],
})
export class AppComponent {
  private store = inject<Store<AppState>>(Store);
}
