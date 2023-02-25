import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AdminFormService } from './admin-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Film, Movie } from '../home/showing/Showings/interfaces';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { prepairCalendar, prepairCalendarForAdmin } from '../home/showing/Showings/calendar/calendar.helper';
import { NumberOfFilms } from '../adminPanel/admin-film.helper.service';
import { RepertoirState } from '../adminPanel/admin.component';
import { RepertoirActions, ShowActions } from '../adminPanel/admin-store/admin.actions';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MatSelectModule,
    ErrorComponent,
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.scss'],
  providers: [AdminFormService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class adminFormComponent {
  @Input() numberOfFilms!: NumberOfFilms[];
  private errorService = inject(ErrorhandlerService);
  private adminFormService = inject(AdminFormService);
  private store = inject<Store<RepertoirState>>(Store);

  date = prepairCalendarForAdmin();
  errorClientServer$ = this.errorService.error$;
  adminForm = this.adminFormService.getForm().controls.adminForm;
  adminHelperService: any;

  get titleCtrl() {
    return this.adminForm.controls.title;
  }

  get linkToPosterCtrl() {
    return this.adminForm.controls.linkToPoster;
  }

  get timeCtrl() {
    return this.adminForm.controls.time;
  }

  get cathegoryCtrl() {
    return this.adminForm.controls.cathegory;
  }

  get shortDescCtrl() {
    return this.adminForm.controls.shortDesc;
  }

  get longDescCtrl() {
    return this.adminForm.controls.longDesc;
  }

  addMovie() {
    this.adminForm.markAllAsTouched();

    if (this.adminForm.invalid) {
      return;
    }
    const values = this.adminForm.getRawValue();
    let movie: Movie = {
      id: NaN,
      img: values.linkToPoster,
      genre: values.cathegory,
      title: values.title,
      length: values.time,
      descriptionShort: values.shortDesc,
      descriptionLong: values.longDesc,
      ageRest: 'Pg-13',
      director: 'Franek',
      actors: [],
      boxOff: '1',
      premiere: true,
      addToFav: false,
    };
    this.store.dispatch(RepertoirActions.postmovie({ movie }));
  }

  //   films$ = this.store.select(state => state.Repertoir.films).pipe(tap(console.log));
  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());
    // this.store.dispatch(ShowActions.getshows());
    // this.adminHelperService.getNumerOfFilms();
    // this.store.subscribe(val => console.log(val));
  }
}
