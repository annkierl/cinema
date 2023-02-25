import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { MyTicketsService } from './my-tickets.service';
import SingleOrderCosmponent from './singleTicket/single-order.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ErrorComponent, SingleOrderCosmponent, RouterModule],
  templateUrl: './mytickets.html',
  styleUrls: ['./mytickets.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyTicketsComponent {
  private errorService = inject(ErrorhandlerService);
  private myTicketService = inject(MyTicketsService);

  orders$ = this.myTicketService.orders$;
  errorClientServer$ = this.errorService.error$;

  ngOnInit() {
    this.myTicketService.getOrders();
  }
}
