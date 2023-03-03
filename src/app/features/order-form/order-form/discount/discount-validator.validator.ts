import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, debounceTime, delay, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';
// import { DiscountService } from './discount.service';
import { DiscountValidatorService } from './discount-validator.service';

@Injectable({
  providedIn: 'root',
})
export class CouponValidator implements AsyncValidator {
  private discountService = inject(DiscountValidatorService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(EMPTY).pipe(
      delay(1000),
      switchMap(() => {
        return this.discountService.checkDiscount(control.value).pipe(
          map(isExisting => (isExisting ? null : { isExisting: true })),
          catchError(() => of(null))
        );
      })
    );
  }
}
