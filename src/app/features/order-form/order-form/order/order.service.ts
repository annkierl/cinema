import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, switchMap } from 'rxjs';
import { TicketsService } from 'src/app/features/tickets/tickets.service';
import { initialOrder, Order } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private ticketService = inject(TicketsService);
  private order$$ = new BehaviorSubject<Order>(initialOrder);
  private router = inject(Router);

  thickets$ = this.ticketService.choosenTickets$;

  get order$() {
    return this.order$$.asObservable();
  }

  addOrder(order: Order) {
    this.order$$.next(order);
    console.log(this.order$$.value);
  }

  sendOrder() {
    return combineLatest([this.order$, this.thickets$])
      .pipe(
        switchMap(([order, tickets]) => {
          return this.http.post('http://localhost:3000/orders', {
            userFirstName: order.userFirstName,
            userLastName: order.userLastName,
            userEmail: order.userEmail,
            userPhoneNumber: order.userPhoneNumber,
            movieTitle: order.movieTitle,
            hall: order.hall,
            hour: order.hour,
            dayId: order.dayId,
            ticket: [...tickets],
          });
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/currentOrder']);
        },
        error: () => {
          console.log('error');
        },
      });
  }
}
