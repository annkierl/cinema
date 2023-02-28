import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { API_URL, IS_PRODUCTION } from '@core/env.token';
import { environment } from 'src/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Repertoir } from './features/adminPanel/admin-store/admin.reducer';
import { RepertoirEffects, ShowEffects } from './features/adminPanel/admin-store/admin.effects';
import { AdminGuard } from './features/auth/guards/admin.guard';
import { userReducer } from './features/auth/store/user.reducer';
import { UserState } from './features/home/AppUser.interface';

export interface AppState {
  User: UserState;
}

@NgModule({
  declarations: [AppComponent],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: IS_PRODUCTION,
      useValue: environment.production,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ Repertoir: Repertoir, User: userReducer }),
    EffectsModule.forRoot([RepertoirEffects, ShowEffects]),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('./features/home/home.module'),
          },
          {
            path: 'admin',
            loadComponent: () => import('./features/adminPanel/admin.component'),
            canMatch: [AdminGuard],
          },
          {
            path: 'admin/showing',
            loadComponent: () => import('./features/admin-form/admin-show-form/admin-show-form.component'),
            canMatch: [AdminGuard],
          },
          {
            path: 'admin/films',
            loadComponent: () => import('./features/admin-form/admin-form.component'),
            canMatch: [AdminGuard],
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
