import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { UserDataStateService } from '../auth/UserData/user-data.service.state';
import { ScreenService } from '../rooms/screen/screen/screen.service';
import { TicketsService } from '../tickets/tickets.service';
import { DiscountStateService } from './OrderForm/Discount/discount.service.state';
import { FormComponent } from './OrderForm/form.component';
import { FormPaymentService } from './OrderForm/formPayment.service';
import { TotalCostService } from './OrderForm/TotalCost/totalCost.service';

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
  private discountStateService = inject(DiscountStateService);
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
