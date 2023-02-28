import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shows } from '../../home/showing/Showings/interfaces';
import { ScreenService } from '../../rooms/screen/screen/screen.service';
import { Seat } from '../tickets-initial';
import { TicketsService } from '../tickets.service';

@Component({
  standalone: true,
  selector: 'app-single-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './single-ticket.html',
  styleUrls: ['./single-ticket.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTicketComponent {
  @ViewChild('options') options!: ElementRef;
  @Input() seat!: Seat;
  @Input() show!: Shows;
  @Input() reservedSeats!: number[][];

  private ticketService = inject(TicketsService);
  private screenService = inject(ScreenService);
  choosenTickets$ = this.ticketService.choosenTickets$;

  type = '';
  cost = 0;
  selectedTicket = '';
  seatsAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  onSelected(seatCol: number, seatRow: number, seatPrintOnScreen: number) {
    let optionArray = this.selectedTicket.split(',');
    this.type = optionArray[0];
    this.cost = Number(optionArray[1].replace('zł', ''));
    this.ticketService.addToTotalCost(this.cost);
    let ticket = {
      row: seatRow,
      column: seatCol,
      colIndexPrintOnScreen: seatPrintOnScreen,
      type: this.type,
      value: this.cost,
    };
    this.ticketService.addTicket(ticket);
    this.ticketService.ticketPriceChoosen();
  }

  delete(column: number, row: number, colIndexPrintOnScree: number) {
    let removedSeat = [row, column];
    this.ticketService.hideWarning();
    this.screenService.removeSeat(this.reservedSeats, this.show.id, removedSeat);
    this.ticketService.removeSeat({
      col: column,
      row: row,
      colIndexPrintOnScreen: colIndexPrintOnScree,
    });
    this.ticketService.removeFromTotalCost(this.cost);
    this.ticketService.removeTicket(row, column);
    this.ticketService.deletedTicketCanGoToPayment();
  }
}
