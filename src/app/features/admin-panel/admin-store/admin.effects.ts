import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackBar } from '@shared/snack-bar-added-to-db/snackBar.component';
import { map, of, switchMap, tap } from 'rxjs';

import { AdminPanelService } from '../admin-panel.service';
import { RepertoirActions, ShowActions } from './admin.actions';
@Injectable()
export class RepertoirEffects {
  private actions$ = inject(Actions);
  private adminPanelService = inject(AdminPanelService);
  private snackBar = inject(MatSnackBar);

  films$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepertoirActions.getfilms),
      switchMap(() => {
        return this.adminPanelService.getRepertoir().pipe(
          map(movies => {
            return RepertoirActions.updatefilms({ films: [...movies] });
          })
        );
      })
    )
  );

  shows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowActions.getshows),
      switchMap(result => {
        return this.adminPanelService.getShows({ dayId: result.dayId, screenId: result.screenId }).pipe(
          map(shows => {
            return ShowActions.updateshows({ shows: [...shows] });
          })
        );
      })
    )
  );
  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepertoirActions.postmovie),

      switchMap(result => {
        return this.adminPanelService.addFilm(result.movie).pipe(
          map(movie => {
            return RepertoirActions.addnewmoviestate();
          }),
          tap(val => {
            this.snackBar.openFromComponent(SnackBar, {
              duration: 5000,
            });
          })
        );
      })
    )
  );

  addShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowActions.postshow),
      switchMap(result => {
        return this.adminPanelService.addShow(result.show).pipe(
          map(show => {
            return ShowActions.addnewshowstate();
          }),
          tap(val => {
            this.snackBar.openFromComponent(SnackBar, {
              duration: 5000,
            });
          })
        );
      })
    )
  );
}

@Injectable()
export class ShowEffects {
  private actions$ = inject(Actions);
  private adminPanelService = inject(AdminPanelService);

  shows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowActions.getshows),
      switchMap(result => {
        return this.adminPanelService.getShows({ dayId: result.dayId, screenId: result.screenId }).pipe(
          map(shows => {
            return ShowActions.updateshows({ shows: [...shows] });
          })
        );
      })
    )
  );
}
