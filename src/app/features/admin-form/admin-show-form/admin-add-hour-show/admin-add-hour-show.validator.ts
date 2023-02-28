import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, EMPTY, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { AdminFilmHelperService } from 'src/app/features/adminPanel/admin-film.helper.service';
import { RepertoirState } from 'src/app/features/adminPanel/admin.component';
import { adminHour } from './admin-add-hour-show.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminValidator implements AsyncValidator {
  private store = inject<Store<RepertoirState>>(Store);
  private adminHelperService = inject(AdminFilmHelperService);
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const form = control as adminHour;
    console.log('hej');
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
