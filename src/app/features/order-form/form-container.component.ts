import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { UserDataStateService } from '../auth/UserData/user-data.service.state';
import { ScreenService } from '../rooms/screen/screen/screen.service';
import { TicketsService } from '../tickets/tickets.service';
import { DiscountStateFullService } from './order-form/discount/discount-statefull-service';
import { FormComponent } from './order-form/form.component';
import { FormPaymentService } from './order-form/form-payment.service';
import { TotalCostService } from './order-form/total-cost/total-cost.service';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [CommonModule, FormComponent, ErrorComponent, LoaderComponent],
  templateUrl: './form-container.html',
  styleUrls: ['./form-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormContainerComponent {
  private ticketService = inject(TicketsService);
  private screenService = inject(ScreenService);
  private userDataService = inject(UserDataStateService);
  private formPaymentService = inject(FormPaymentService);
  private errorService = inject(ErrorhandlerService);
  private discountStateService = inject(DiscountStateFullService);
  private totalCostService = inject(TotalCostService);

  errorClientServer$ = this.errorService.error$;
  movieDetails$ = this.screenService.filmProp$;
  totalCost$ = this.totalCostService.totalCost$;
  userData$ = this.userDataService.userData$;
  choosenTickets$ = this.ticketService.choosenTickets$;
  discounts$ = this.discountStateService.discount$;
  canPay$ = this.formPaymentService.canPay$;

  ngOnInit() {
    this.userDataService.getUserDataUpdateState();
    this.discountStateService.getDiscountCodesUpdateState();
  }
}
