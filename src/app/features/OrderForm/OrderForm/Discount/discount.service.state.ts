import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { TicketsService } from 'src/app/features/tickets/tickets.service';
import { Discount } from './discount-initial';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root',
})
export class DiscountStateService {
  @Input() discounts!: Discount[];
  private discount$$ = new BehaviorSubject<Discount[]>([]);
  private ticketService = inject(TicketsService);
  private discountHttpService = inject(DiscountService);

  get discount$() {
    return this.discount$$.asObservable();
  }

  getDiscountCodesUpdateState() {
    return this.discountHttpService.getDiscountCodes().subscribe(codes => this.discount$$.next(codes));
  }

  removeDiscountUpdateState(code: string) {
    let filtrated = this.discount$$.value.filter(element => element.code === code);
    this.discountHttpService.removeDiscount1(filtrated[0].id).subscribe(val => this.getDiscountCodesUpdateState());
    this.ticketService.removeFromTotalCost(filtrated[0].discount);
  }

  removeDiscount(code: string) {
    let filtrated = this.discount$$.value.filter(element => element.code === code);
    this.discountHttpService.removeDiscount1(filtrated[0].id).subscribe(val => this.getDiscountCodesUpdateState());
    this.ticketService.removeFromTotalCost(filtrated[0].discount);
  }
}
