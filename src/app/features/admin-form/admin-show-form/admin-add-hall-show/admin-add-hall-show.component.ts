import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ShowActions } from 'src/app/features/adminPanel/admin-store/admin.actions';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';

import { AdminFormHallService } from './adminFormHall.service';
import AdminHallFormComponent from '../admin-add-hour-show/admin-add-hour-show.component';
import { AdminFilmHelperService } from 'src/app/features/adminPanel/admin-film.helper.service';

@Component({
  selector: 'app-admin-hall-form',
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
    AdminHallFormComponent,
  ],
  templateUrl: './admin-add-hall-show.html',
  styleUrls: ['./admin-add-hall-show.scss'],
  providers: [AdminFormHallService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminAddHallComponent {
  @Input() movieId!: string;
  @Input() dayId!: string;
  @Output() emitHallId = new EventEmitter<string>();

  private store = inject<Store<RepertoirState>>(Store);
  private adminHallService = inject(AdminFormHallService);
  private adminHelperService = inject(AdminFilmHelperService);

  adminFormHall = this.adminHallService.getForm().controls.adminHallForm;
  shows$ = this.store.select(state => state.Repertoir.shows);
  hallId = this.hallCtrl.value;
  isOpenForm = false;

  get hallCtrl() {
    return this.adminFormHall.controls.hall;
  }

  onSelect() {
    this.hallId = this.hallCtrl.value;
    this.isOpenForm = true;
    this.emitHallId.emit(this.hallCtrl.value);
    this.adminHelperService.getShowsWithFilms(this.dayId, this.hallId);
    // this.adminHelperService.showswithFilms$.subscribe(element => console.log(element));
    // this.adminHelperService.compareHours();
    this.store.dispatch(ShowActions.getshows({ dayId: Number(this.dayId), screenId: 1 }));
  }
}
