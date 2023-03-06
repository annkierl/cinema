import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoSpaceDirective } from '@shared/no-space.directive';
import { FormPaymentService } from '../form-payment.service';
import { OrderService } from '../Order/order.service';
@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NoSpaceDirective],
  templateUrl: './payment-form.html',
  styleUrls: ['./payment-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private paymentService = inject(FormPaymentService);
  private orderService = inject(OrderService);

  paymentForm = this.createForm();

  get blikCtrl() {
    return this.paymentForm.controls.blikNumber;
  }

  createForm() {
    return this.fb.group({
      blikNumber: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      }),
    });
  }

  handleSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) return;
    let code = Number(this.blikCtrl.value);
    this.paymentService.sendPayment(code);
    this.orderService.sendOrder();
  }
}
