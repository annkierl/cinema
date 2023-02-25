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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';
import AdminAddDateShowFormComponent from '../admin-add-show.component/admin-addDate-show-form.component';
import { AdminAddHallFormService } from './admin-add-hour-show.service';
import { ShowActions } from 'src/app/features/adminPanel/admin-store/admin.actions';

@Component({
  selector: 'app-admin-addhHour',
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
  templateUrl: './admin-add-hour-show.html',
  styleUrls: ['./admin-add-hour-show.scss'],
  providers: [AdminAddHallFormService],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminHourFormComponent {
  @Input() movieId!: string;
  @Input() dayId!: string;
  @Input() hallId!: string;

  private errorService = inject(ErrorhandlerService);
  private store = inject<Store<RepertoirState>>(Store);
  private adminFormHallService = inject(AdminAddHallFormService);

  adminFormHour = this.adminFormHallService.getForm();
  isOpenForm = false;
  errorClientServer$ = this.errorService.error$;

  get hourCtrl() {
    return this.adminFormHour;
  }

  onSelect() {
    const value = this.hourCtrl.value;
    this.store.dispatch(ShowActions.getshows({ dayId: Number(this.dayId), screenId: Number(this.hallId) }));
    this.isOpenForm = true;
  }
  onSubmit() {
    const value = this.hourCtrl.value.hour;
    this.store.dispatch(
      ShowActions.postshow({
        show: {
          id: 22,
          screenId: Number(this.hallId),
          hour: value!,
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
          movieId: Number(this.movieId),
          dateId: Number(this.dayId),
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
