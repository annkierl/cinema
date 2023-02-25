import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { MyTicketsService } from '../../myTickets/my-tickets.service';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [CommonModule, ErrorComponent, LoaderComponent, RouterModule],
  templateUrl: './successPayment.html',
  styleUrls: ['./successPayment.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormContainerComponent {
  private myTicketService = inject(MyTicketsService);
  private errorService = inject(ErrorhandlerService);

  orders$ = this.myTicketService.orders$;
  errorClientServer$ = this.errorService.error$;
  ngOnInit() {
    this.myTicketService.getOrders();
  }
}
