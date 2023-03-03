import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { MyTicketsService } from '../my-tickets.service';

@Component({
  selector: 'app-single-order',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ErrorComponent],
  templateUrl: './single-order.html',
  styleUrls: ['./single-order.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SingleOrderComponent {
  private route = inject(ActivatedRoute);
  private errorService = inject(ErrorhandlerService);
  private myTicketService = inject(MyTicketsService);

  orders$ = this.myTicketService.orders$;
  errorClientServer$ = this.errorService.error$;
  seatsAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  id!: number;

  ngOnInit() {
    this.myTicketService.getOrders();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }
}
