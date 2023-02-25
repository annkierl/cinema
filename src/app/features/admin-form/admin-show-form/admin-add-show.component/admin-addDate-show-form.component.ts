import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';
import { prepairCalendarForAdmin } from 'src/app/features/home/showing/Showings/calendar/calendar.helper';
import { AdminFormShowService } from './admin-add-show-form.service';
import { ShowActions } from 'src/app/features/adminPanel/admin-store/admin.actions';
import AdminAddHallComponent from '../admin-add-hall-show/admin-add-hall-show.component';
import { AdminFilmHelperService } from 'src/app/features/adminPanel/admin-film.helper.service';

@Component({
  selector: 'app-admin-add-show-form',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    AdminAddHallComponent,
    MatSelectModule,
    ErrorComponent,
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-addDate-show-form.html',
  styleUrls: ['./admin-addDate-show-form.scss'],
  providers: [AdminFormShowService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminAddDateShowFormComponent {
  @Input() movieId!: string;
  @Output() emitHallId = new EventEmitter<string>();
  @Output() emitDayId = new EventEmitter<string>();

  private errorService = inject(ErrorhandlerService);
  private adminFormShowService = inject(AdminFormShowService);
  private store = inject<Store<RepertoirState>>(Store);
  private adminHelperService = inject(AdminFilmHelperService);

  hallId!: string;
  adminFormShow = this.adminFormShowService.getForm().controls.adminShowForm;
  date = prepairCalendarForAdmin();
  errorClientServer$ = this.errorService.error$;
  dayId = this.dayCtrl.value;
  isOpenForm = false;

  get dayCtrl() {
    return this.adminFormShow.controls.day;
  }

  updateHallId(hallId: string) {
    this.hallId = hallId;
  }

  onSelect() {
    this.dayId = this.dayCtrl.value;
    this.emitDayId.emit(this.dayCtrl.value);
    this.adminHelperService.getShowsWithFilms(this.dayId, this.hallId);
    this.isOpenForm = true;
    this.store.dispatch(ShowActions.getshows({ dayId: Number(this.dayId), screenId: Number(this.hallId) }));
  }
}
