import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Movie } from 'src/app/features/home/showing/Showings/interfaces';
import { ShowActions } from 'src/app/features/adminPanel/admin-store/admin.actions';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';
import { AdminMovieListService } from './admin-movieList-show.service';
import { AdminFilmHelperService } from 'src/app/features/adminPanel/admin-film.helper.service';
import { prepairCalendar } from 'src/app/features/home/showing/Showings/calendar/calendar.helper';
import { ShowingsService } from 'src/app/features/home/showing/Showings/showings.service';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-movielist-show',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MatSelectModule,
    ErrorComponent,
    RouterModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-movieList-show.html',
  styleUrls: ['./admin-movieList-show.scss'],
  providers: [AdminMovieListService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminMovieListShowComponent {
  @Input() movies!: Movie[];
  private errorService = inject(ErrorhandlerService);
  private store = inject<Store<RepertoirState>>(Store);
  private adminFormShowService = inject(AdminMovieListService);
  private adminHelperService = inject(AdminFilmHelperService);
  private showingService = inject(ShowingsService);

  errorClientServer$ = this.errorService.error$;
  adminFormMovieList = this.adminFormShowService.getForm().controls.adminMovieList;
  adminAddScreeningForm = this.adminFormShowService.getFormAdmin();
  date = prepairCalendar();

  get movieScreeningCtrl() {
    return this.adminAddScreeningForm.controls.movie;
  }

  get dayScreeningCtrl() {
    return this.adminAddScreeningForm.controls.day;
  }

  get hallScreeningCtrl() {
    return this.adminAddScreeningForm.controls.hall;
  }

  get hourScreeningCtrl() {
    return this.adminAddScreeningForm.controls.hour;
  }

  onSelectHall() {
    let dayId = this.dayScreeningCtrl.value;
    let hallId = this.hallScreeningCtrl.value;
    this.adminHelperService.getShowsWithFilms(dayId, hallId);
    let movieObj = JSON.parse(JSON.stringify(this.movieScreeningCtrl.value));
    this.adminHelperService.insertdurationOfFilm(movieObj.movieLen);
  }

  onCheckAvaible() {
    this.adminAddScreeningForm.markAllAsTouched();
    let movieObj = JSON.parse(JSON.stringify(this.movieScreeningCtrl.value));
    let dayId = this.dayScreeningCtrl.value;
    let hallId = this.hallScreeningCtrl.value;
    let hour = this.hourScreeningCtrl.value;
    this.adminHelperService.getShowsWithFilms(dayId, hallId);
    this.showingService.postFilms(movieObj.movieId, Number(dayId));
    this.adminAddScreeningForm.reset();
    this.store.dispatch(ShowActions.getshows({ dayId: Number(dayId), screenId: Number(hallId) }));
    this.store.dispatch(
      ShowActions.postshow({
        show: {
          id: NaN,
          screenId: Number(hallId),
          hour: hour,
          reservedSeats: [],
          priceList: [
            {
              type: 'Normalny',
              price: '30',
            },
            {
              type: 'Ulgowy',
              price: '15',
            },
            {
              type: 'Voucher',
              price: '20',
            },
          ],
          movieId: movieObj.movieId,
          dateId: Number(dayId),
          screenLayout: [],
          screen: {
            id: 1,
            name: '',
            rows: 10,
            colu: 10,
            specialSeats: [],
          },
        },
      })
    );
  }
}

@Component({
  standalone: true,
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: './snack-bar-annotated-component-example-snack.html',
  styles: [
    `
      :host {
        display: flex;
      }

      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
