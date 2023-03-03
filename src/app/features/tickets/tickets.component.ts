import { CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { TotalCostService } from '../order-form/order-form/total-cost/total-cost.service';
import { ScreenService } from '../rooms/screen/screen/screen.service';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, SingleTicketComponent],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent {
  @ViewChild('options') options!: ElementRef;
  @Input() reservedSeats!: number[][];
  selectedTicket = '';

  private router = inject(Router);
  private screenService = inject(ScreenService);
  private ticketService = inject(TicketsService);
  private totalCostService = inject(TotalCostService);

  max10TicketsWarning$ = this.ticketService.max10TicketsWarning$;
  totalCost$ = this.totalCostService.totalCost$;
  choosentickets$1 = this.ticketService.choosenTickets$.pipe(
    map(value => {
      let sum = 0;
      value.forEach(element => {
        sum = sum + element.value;
      });
      return sum;
    })
  );
  ticket$ = this.ticketService.choosenTickets$;
  seat$ = this.ticketService.choosenSeat$;
  show$ = this.screenService.show$;
  isTicketChoosen$ = this.ticketService.isTicketChoosen$;

  goToPayment() {
    this.router.navigate(['/form']);
  }

  ngOnDestroy() {
    // this.ticketService.resetSeats();
  }
}
