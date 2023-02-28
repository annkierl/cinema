import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { dataForOrder } from './form.interface';
import { validatorCompareEmail } from '../validatorCompareEmail.validator';
import { pattern } from '@shared/patterns';
import { CommonModule } from '@angular/common';
import { singleMovieProp } from '../../home/showing/Showings/film-lists/shows/shows.component';
import { User } from '../../auth/UserData/user-initial';
import { Ticket } from '../../tickets/tickets-initial';
import { DiscountService } from './Discount/discount.service';
import { DiscountFormComponent } from './Discount/discount-form.component';
import { Discount } from './Discount/discount-initial';
import { PaymentFormComponent } from './paymentForm/payment-form.component';
import { FormPaymentService } from './formPayment.service';
import { OrderService } from './Order/order.service';
import { Order } from './Order/order.interface';
import { NumberDirective } from '@shared/directives/onlyNumber.directive';
import { NoSpaceDirective } from '@shared/no-space.directive';
import { TicketsService } from '../../tickets/tickets.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    NumberDirective,
    CommonModule,
    ReactiveFormsModule,
    DiscountFormComponent,
    PaymentFormComponent,
    NoSpaceDirective,
  ],
  standalone: true,
  templateUrl: './form.html',
  styleUrls: ['./form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input() totalCost!: { discount: number };
  @Input() movieDetails!: singleMovieProp;
  @Input() userData!: User;
  @Input() choosenTickets!: Ticket[];
  @Input() discounts!: Discount[];
  @Input() canPay!: { canPay: boolean };

  private builder = inject(NonNullableFormBuilder);
  private dicountService = inject(DiscountService);
  private formPaymentService = inject(FormPaymentService);
  private orderService = inject(OrderService);
  private ticketService = inject(TicketsService);

  seatsAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  orderForm = this.createGroup();

  private createGroup(): dataForOrder {
    return this.builder.group(
      {
        firstName: this.builder.control(``, {
          validators: [Validators.required],
        }),
        lastName: this.builder.control(``, { validators: [Validators.required] }),
        email: this.builder.control(``, {
          validators: [Validators.required, Validators.pattern(`${pattern.emailValidatorRegex}`)],
        }),
        repeatEmail: this.builder.control(``, {
          validators: [Validators.required, Validators.pattern(`${pattern.emailValidatorRegex}`)],
        }),
        phoneNumber: this.builder.control(``, { validators: [Validators.minLength(9), Validators.maxLength(9)] }),
      },
      { validators: validatorCompareEmail('repeatEmail', 'email') }
    );
  }

  get firstNameCtrl() {
    return this.orderForm.controls.firstName;
  }

  get lastNameCtrl() {
    return this.orderForm.controls.lastName;
  }

  get phoneNumberCtrl() {
    return this.orderForm.controls.phoneNumber;
  }

  get repeatEmailCtrl() {
    return this.orderForm.controls.repeatEmail;
  }

  get emailCtrl() {
    return this.orderForm.controls.email;
  }

  orderTickets(movieTitle: string, hall: number, hour: string, cost: number) {
    this.orderForm.markAllAsTouched();
    if (this.orderForm.invalid) {
      this.formPaymentService.blockPayment();
      return;
    }
    const values = this.orderForm.getRawValue();
    let orderData: Order = {
      userFirstName: values.firstName,
      userLastName: values.lastName,
      userEmail: values.email,
      userPhoneNumber: values.phoneNumber,
      movieTitle: movieTitle,
      hall: hall,
      hour: hour,
    };
    this.orderService.addOrder(orderData);
    this.formPaymentService.goToPayment();
  }

  choosentickets$1 = this.ticketService.choosenTickets$.pipe(
    map(value => {
      let sum = 0;
      value.forEach(element => {
        sum = sum + element.value;
      });
      return sum;
    })
  );

  ngOnDestroy() {
    this.formPaymentService.blockPayment();
  }
}
