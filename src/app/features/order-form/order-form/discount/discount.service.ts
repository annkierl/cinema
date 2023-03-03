import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { Discount } from './discount.initial';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  @Input() discounts!: Discount[];
  private http = inject(HttpClient);

  getDiscountCodes() {
    return this.http.get<Discount[]>(`http://localhost:3000/discount`);
  }

  removeDiscount1(id: number) {
    return this.http.delete(`http://localhost:3000/discount/${id}`);
  }
}
