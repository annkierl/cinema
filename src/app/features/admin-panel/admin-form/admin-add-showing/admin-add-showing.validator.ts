import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, EMPTY, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { AdminFilmHelperService } from 'src/app/features/admin-panel/admin-film.helper.service';

@Injectable({
  providedIn: 'root',
})
export class AdminValidator implements AsyncValidator {
  // private store = inject<Store<RepertoirState>>(Store);
  private adminHelperService = inject(AdminFilmHelperService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(EMPTY).pipe(
      debounceTime(1000),
      switchMap(() => {
        return this.adminHelperService.compareHours(control.value).pipe(
          tap(console.log),
          map(value => {
            return value ? { cant: true } : null;
          }),
          first(),
          catchError(() => of(null))
        );
      })
    );
  }
}
