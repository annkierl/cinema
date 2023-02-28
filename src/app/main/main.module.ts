import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmListsComponent } from '../features/home/showing/Showings/film-lists/film-lists.component';
import { ShowsComponent } from '../features/home/showing/Showings/film-lists/shows/shows.component';
import { SingleMovieComponent } from '../features/home/showing/Showings/film-lists/single-movie/single-movie.component';
import { ShowingsComponent } from '../features/home/showing/Showings/showings.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../features/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JudgeComponent } from '../features/home/showing/Showings/film-lists/single-movie/judge/judge.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PhoneValidatorDirective } from '../features/OrderForm/phone-validator.directive';
import { AvrageOfArrayPipe } from '../avrage-of-array.pipe';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorhandlerInterceptor } from '@shared/interceptor/errorhandler.interceptor';
import { LoaderInterceptor } from '@shared/interceptor/loader-interceptor.interceptor';
import { LoaderComponent } from '@shared/loader/loader.component';
import { ErrorComponent } from '@shared/error/error.component';
import { UserGuard } from '../features/auth/guards/user.guard';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorhandlerInterceptor,
      multi: true,
    },
  ],
  declarations: [
    FilmListsComponent,
    PhoneValidatorDirective,
    AvrageOfArrayPipe,
    SingleMovieComponent,
    ShowsComponent,
    ShowingsComponent,
    JudgeComponent,
    SingleMovieComponent,
  ],
  imports: [
    CommonModule,
    LoaderComponent,
    ErrorComponent,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'shows/:id',
        component: ShowingsComponent,
        canMatch: [UserGuard],
      },
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'shows',
        loadChildren: () => import('../features/rooms/rooms.module'),
        canMatch: [UserGuard],
      },
      {
        path: 'form',
        loadComponent: () => import('../features/OrderForm/form-container.component'),
        canMatch: [UserGuard],
      },
      {
        path: 'wishList',
        loadComponent: () => import('../features/wishList/wish-list.component'),
        canMatch: [UserGuard],
      },
      {
        path: 'myTickets',
        loadComponent: () => import('../features/myTickets/my-tickets.component'),
        canMatch: [UserGuard],
      },
      {
        path: 'myTickets/:id',
        loadComponent: () => import('../features/myTickets/singleTicket/single-order.component'),
        canMatch: [UserGuard],
      },
      {
        path: 'currentOrder',
        loadComponent: () => import('../features/OrderForm/successPyment/successPayment.component'),
        canMatch: [UserGuard],
      },
    ]),
  ],
})
export default class MainModule {}
