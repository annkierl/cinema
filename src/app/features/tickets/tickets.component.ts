import { CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  selectedTicket = '';

  private router = inject(Router);
  private screenService = inject(ScreenService);
  private ticketService = inject(TicketsService);

  max10TicketsWarning$ = this.ticketService.max10TicketsWarning$;

  ticket$ = this.ticketService.choosenTickets$;
  seat$ = this.ticketService.choosenSeat$;
  show$ = this.screenService.show$;
  totalCost$ = this.ticketService.totalCost$;
  isTicketChoosen$ = this.ticketService.isTicketChoosen$;

  goToPayment() {
    this.router.navigate(['/form']);
  }

  ngOnDestroy() {
    this.ticketService.resetSeats();
  }
}
