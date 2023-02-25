import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { tap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Movie, Shows } from 'src/app/features/home/showing/Showings/interfaces';
import { ShowActions } from 'src/app/features/adminPanel/admin-store/admin.actions';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';
import { AdminMovieListService } from './admin-movieList-show.service';
import AdminAddDateShowFormComponent from '../admin-add-show.component/admin-addDate-show-form.component';
import { AdminFilmHelperService } from 'src/app/features/adminPanel/admin-film.helper.service';

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
    AdminAddDateShowFormComponent,
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

  hallId: string | undefined;
  dayId: string | undefined;
  adminFormMovieList = this.adminFormShowService.getForm().controls.adminMovieList;
  movieLength = this.movieCtrl.value;
  isOpenForm = false;
  errorClientServer$ = this.errorService.error$;

  get movieCtrl() {
    return this.adminFormMovieList.controls.movie;
  }

  updateHallId(hallId: string) {
    this.hallId = hallId;
  }

  updateDayId(dayId: string) {
    this.dayId = dayId;
  }
  onSelect() {
    this.movieLength = this.movieCtrl.value;
    this.adminHelperService.insertdurationOfFilm(this.movieLength);
    // console.log(this.movieLength);
    this.isOpenForm = true;
    this.adminHelperService.compareThis();
    this.store.dispatch(ShowActions.getshows({ dayId: Number(this.dayId), screenId: Number(this.hallId) }));
  }
}
