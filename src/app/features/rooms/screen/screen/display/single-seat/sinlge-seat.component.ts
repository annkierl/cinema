import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map, tap } from 'rxjs';
import { Seat, Ticket } from 'src/app/features/tickets/tickets-initial';
import { TicketsService } from 'src/app/features/tickets/tickets.service';

interface Coordinates {
  seat: string;
  rowIndex: number;
  colIndex: number;
  disabled: boolean | undefined;
}
@Component({
  selector: 'app-sinlge-seat',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './single-seat.html',
  styleUrls: ['./single-seat.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinlgeSeatComponent {
  @Input() coordinates!: Coordinates;

  ticketService = inject(TicketsService);
  seat$ = this.ticketService.choosenSeat$;

  toggle = false;
  chooseSeat(rowIndex: number, colIndex: number, seat: string, singleseat: Seat[]) {
    if (singleseat.length > 9) {
      this.ticketService.showWarning();
      return;
    }

    let column = Number(seat);
    let ticket: Ticket = {
      row: rowIndex,
      type: 'Normalny',
      value: 30,
      column: column,
      colIndexPrintOnScreen: colIndex,
    };
    let isSeatAdded = singleseat.some(value => {
      return value.col === column && value.row === rowIndex;
    });

    if (!isSeatAdded) {
      this.ticketService.addSeat({ col: column, row: rowIndex, colIndexPrintOnScreen: colIndex });
    } else {
      this.ticketService.removeSeat({ col: column, row: rowIndex, colIndexPrintOnScreen: colIndex });
    }
    this.ticketService.notTicketPriceChoosen();
  }
}
