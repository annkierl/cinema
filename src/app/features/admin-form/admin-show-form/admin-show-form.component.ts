import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AdminFormService } from '../admin-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NumberOfFilms } from '../../adminPanel/admin-film.helper.service';
import { RepertoirActions, ShowActions } from '../../adminPanel/admin-store/admin.actions';
import { RepertoirState } from '../../adminPanel/admin.component';
import AdminMovieListShowComponent from './listOfMoviesToAddShow/admin-movieList-show.component';

@Component({
  selector: 'app-admin-show-form',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MatSelectModule,
    ErrorComponent,
    AdminMovieListShowComponent,
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './adminShowForm.html',
  styleUrls: ['./adminShowForm.scss'],
  providers: [AdminFormService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminAddShowComponent {
  @Input() numberOfFilms!: NumberOfFilms[];
  private store = inject<Store<RepertoirState>>(Store);
  addshow() {}
  films$ = this.store.select(state => state.Repertoir.films);
  shows$ = this.store.select(state => state.Repertoir.shows);

  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());
    // this.store.dispatch(ShowActions.getshows({ id: 2 }));
    // this.adminHelperService.getNumerOfFilms();
    // this.store.subscribe(val => console.log(val));
  }
}
