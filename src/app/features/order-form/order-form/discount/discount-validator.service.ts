import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { Discount } from './discount.initial';

@Injectable({
  providedIn: 'root',
})
export class DiscountValidatorService {
  @Input() discounts!: Discount[];
  private http = inject(HttpClient);

  checkDiscount(value: string) {
    return this.http.get<Discount[]>(`http://localhost:3000/discount?code=${value}`).pipe(
      switchMap(result => {
        return of(!!result.length);
      })
    );
  }
}
