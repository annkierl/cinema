import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AdminFormService } from './admin-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../../../home/showing/Showings/interfaces';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { prepairCalendar } from '../../../home/showing/Showings/calendar/calendar.helper';
import { RepertoirState } from '../../admin.component';
import { RepertoirActions } from '../../admin-store/admin.actions';
import { NoSpaceDirective } from '@shared/no-space.directive';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    NoSpaceDirective,
  ],
  templateUrl: './admin-form.html',
  styleUrls: ['./admin-form.scss'],
  providers: [AdminFormService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class adminFormComponent {
  private errorService = inject(ErrorhandlerService);
  private adminFormService = inject(AdminFormService);
  private store = inject<Store<RepertoirState>>(Store);
  private snackBar = inject(MatSnackBar);

  date = prepairCalendar();
  errorClientServer$ = this.errorService.error$;
  adminForm = this.adminFormService.getForm().controls.adminForm;

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
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
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
      canBeJudged: true,
    };
    this.store.dispatch(RepertoirActions.postmovie({ movie }));
    this.adminForm.reset();
  }

  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());
  }
}
