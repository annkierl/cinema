import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SingleOrder } from '../order-form/order-form/Order/order.interface';

@Injectable({
  providedIn: 'root',
})
export class MyTicketsService {
  private orders$$ = new BehaviorSubject<SingleOrder[]>([]);
  private http = inject(HttpClient);

  get orders$() {
    return this.orders$$.asObservable();
  }

  getOrders() {
    this.http.get<SingleOrder[]>(`http://localhost:3000/orders`).subscribe(orders => this.orders$$.next(orders));
  }
}
