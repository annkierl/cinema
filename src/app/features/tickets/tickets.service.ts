import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Seat, Ticket, InitialTicket } from './tickets-initial';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private choosenTickets$$ = new BehaviorSubject<Ticket[]>([]);
  private choosenSeat$$ = new BehaviorSubject<Seat[]>([]);
  private max10TicketsWarning$$ = new BehaviorSubject<{ tooMany: boolean }>({ tooMany: false });
  private totalCost$$ = new BehaviorSubject<{ total: number }>({ total: 0 });
  private isTicketChoosen$$ = new BehaviorSubject<{ isTicket: boolean }>({ isTicket: true });

  get isTicketChoosen$() {
    return this.isTicketChoosen$$.asObservable();
  }

  get max10TicketsWarning$() {
    return this.max10TicketsWarning$$.asObservable();
  }

  get totalCost$() {
    return this.totalCost$$.asObservable();
  }

  get choosenTickets$() {
    return this.choosenTickets$$.asObservable();
  }

  get choosenSeat$() {
    return this.choosenSeat$$.asObservable();
  }

  // Cant Pay without choosing ticketType
  ticketPriceChoosen() {
    return this.isTicketChoosen$$.next({ isTicket: false });
  }
  notTicketPriceChoosen() {
    return this.isTicketChoosen$$.next({ isTicket: true });
  }

  deletedTicketCanGoToPayment() {
    if (this.choosenTickets$$.value.length === 0) {
      this.notTicketPriceChoosen();
    }
  }
  // Cant Pay without choosing ticketType

  showWarning() {
    return this.max10TicketsWarning$$.next({ tooMany: true });
  }

  hideWarning() {
    return this.max10TicketsWarning$$.next({ tooMany: false });
  }

  //Cost Summary
  addToTotalCost(cost: number) {
    let previousCost = this.totalCost$$.value.total;
    return this.totalCost$$.next({ total: previousCost + cost });
  }

  removeFromTotalCost(cost: number) {
    let previousCost = this.totalCost$$.value.total;
    return this.totalCost$$.next({ total: previousCost - cost });
  }

  resetTotalCost() {
    return this.totalCost$$.next({ total: 0 });
  }
  //Cost Summary

  removeTicket(row: number, column: number) {
    let filtrated = this.choosenTickets$$.value.filter(element => element.column !== column || element.row !== row);
    this.choosenTickets$$.next(filtrated);
  }

  addTicket(ticket: Ticket) {
    let filtrated = this.choosenTickets$$.value.filter(
      element => element.column !== ticket.column || element.row !== ticket.row
    );
    this.choosenTickets$$.next([...filtrated, ticket]);
  }

  addSeat(seat: Seat) {
    this.choosenSeat$$.next([...this.choosenSeat$$.value, seat]);
  }

  resetSeats() {
    this.choosenSeat$$.next([]);
  }

  removeSeat(seat: Seat) {
    const currentItems = this.choosenSeat$$.value;

    const itemsWithoutDeleted = currentItems.filter(element => {
      return element.row !== seat.row || element.col !== seat.col;
    });

    this.choosenSeat$$.next(itemsWithoutDeleted);
  }
}
