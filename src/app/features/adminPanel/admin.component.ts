import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Routes, RouterModule } from '@angular/router';
import adminFormComponent from '../admin-form/admin-form.component';
import { AdminPanelService } from './admin-panel.service';
import { FilmsState, ShowState } from './admin-store/admin.store';
import { Store } from '@ngrx/store';
import { RepertoirActions, ShowActions } from './admin-store/admin.actions';
import AdminNavigationComponent from './admin-navigation/admin-navigation.component';
import { tap } from 'rxjs';
import { AdminFilmHelperService } from './admin-film.helper.service';

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
  private adminHelperService = inject(AdminFilmHelperService);
  private store = inject<Store<RepertoirState>>(Store);

  numberOfFilms$ = this.adminHelperService.numberOfFilms$;
  errorClientServer$ = this.errorService.error$;

  films$ = this.store.select(state => state.Repertoir.films).pipe(tap(console.log));
  // shows$ = this.store.select(state => state);

  ngOnInit() {
    this.store.dispatch(RepertoirActions.getfilms());

    this.adminHelperService.getNumerOfFilms();
    // this.store.subscribe(val => console.log(val));
  }
}
