import { CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TotalCostService } from '../order-form/order-form/total-cost/total-cost.service';
import { ScreenService } from '../rooms/screen/screen/screen.service';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { TicketsService } from './tickets.service';
import { dateMock } from '../home/showing/Showings/calendar/calendar.helper';
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
  @Input() choosenMovieProp!: {
    title: string;
    hour: string;
    hall: number;
  };
  selectedTicket = '';

  private router = inject(Router);
  private screenService = inject(ScreenService);
  private ticketService = inject(TicketsService);
  private totalCostService = inject(TotalCostService);
  private route = inject(ActivatedRoute);

  showId = this.route.snapshot.params['id'];
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
    this.screenService.getFilmProp({
      title: this.choosenMovieProp.title,
      hour: this.choosenMovieProp.hour,
      hall: this.choosenMovieProp.hall,
      showId: this.showId,
      dayId: dateMock[Number(this.route.snapshot.url[0].path)],
    });
  }

  ngOnDestroy() {
    // this.ticketService.resetSeats();
  }
}
