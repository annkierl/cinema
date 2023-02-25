import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { TicketsService } from 'src/app/features/tickets/tickets.service';
import { Discount } from './discount-initial';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  @Input() discounts!: Discount[];
  private http = inject(HttpClient);
  private discount$$ = new BehaviorSubject<Discount[]>([]);
  private ticketService = inject(TicketsService);

  get discount$() {
    return this.discount$$.asObservable();
  }

  getDiscountCodes() {
    this.http.get<Discount[]>(`http://localhost:3000/discount`).subscribe(codes => this.discount$$.next(codes));
  }

  removeDiscount(code: string) {
    let filtrated = this.discount$$.value.filter(element => element.code === code);
    this.http.delete(`http://localhost:3000/discount/${filtrated[0].id}`).subscribe(val => this.getDiscountCodes());
    this.ticketService.removeFromTotalCost(filtrated[0].discount);
  }

  checkDiscount(value: string) {
    return this.http.get<Discount[]>(`http://localhost:3000/discount?code=${value}`).pipe(
      switchMap(result => {
        return of(!!result.length);
      })
    );
  }
}
