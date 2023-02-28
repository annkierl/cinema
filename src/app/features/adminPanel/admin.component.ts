import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import adminFormComponent from '../admin-form/admin-form.component';
import { FilmsState, ShowState } from './admin-store/admin.store';
import { Store } from '@ngrx/store';
import { RepertoirActions } from './admin-store/admin.actions';
import AdminNavigationComponent from './admin-navigation/admin-navigation.component';
import { tap } from 'rxjs';

export interface RepertoirState {
  Repertoir: {
    films: FilmsState;
    shows: ShowState;
  };
}
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ErrorComponent, RouterModule, AdminNavigationComponent, adminFormComponent],
  templateUrl: './adminMainPanel.html',
  styleUrls: ['./adminMainPanel.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class adminMainPanel {
  private errorService = inject(ErrorhandlerService);
  private store = inject<Store<RepertoirState>>(Store);

  errorClientServer$ = this.errorService.error$;
  films$ = this.store.select(state => state.Repertoir.films).pipe(tap(console.log));

  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());
  }
}
