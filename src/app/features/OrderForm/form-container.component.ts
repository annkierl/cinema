import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorComponent } from '@shared/error/error.component';
import { ErrorhandlerService } from '@shared/interceptor/error.service';
import { LoaderComponent } from '@shared/loader/loader.component';
import { UserDataService } from '../auth/UserData/user-data.service';
import { ScreenService } from '../rooms/screen/screen/screen.service';
import { TicketsService } from '../tickets/tickets.service';
import { DiscountService } from './OrderForm/Discount/discount.service';
import { FormComponent } from './OrderForm/form.component';
import { FormPaymentService } from './OrderForm/formPayment.service';

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
  private userDataService = inject(UserDataService);
  private discountService = inject(DiscountService);
  private formPaymentService = inject(FormPaymentService);
  private errorService = inject(ErrorhandlerService);

  errorClientServer$ = this.errorService.error$;
  movieDetails$ = this.screenService.filmProp$;
  totalCost$ = this.ticketService.totalCost$;
  userData$ = this.userDataService.userData$;
  choosenTickets$ = this.ticketService.choosenTickets$;
  discounts$ = this.discountService.discount$;
  canPay$ = this.formPaymentService.canPay$;

  ngOnInit() {
    this.userDataService.getUserData();
    this.discountService.getDiscountCodes();
  }
}
