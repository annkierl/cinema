import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { LoaderComponent } from '@shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AdminFormService } from './admin-add-movie/admin-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RepertoirActions } from '../admin-store/admin.actions';
import { RepertoirState } from '../admin.component';
import AdminMovieListShowComponent from './admin-add-showing/admin-add-showing.component';

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
  private store = inject<Store<RepertoirState>>(Store);

  films$ = this.store.select(state => state.Repertoir.films);
  shows$ = this.store.select(state => state.Repertoir.shows);

  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());
  }
}
