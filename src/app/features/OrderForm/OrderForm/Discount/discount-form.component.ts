import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TicketsService } from 'src/app/features/tickets/tickets.service';
import { Discount } from './discount-initial';
import { DiscountService } from './discount.service';
import { CouponValidator } from './discountValidator.validator';
@Component({
  selector: 'app-discount-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './discountForm.html',
  styleUrls: ['./discountForm.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountFormComponent {
  @Input() discounts!: Discount[];

  private fb = inject(NonNullableFormBuilder);
  private couponValidator = inject(CouponValidator);
  private discountService = inject(DiscountService);

  private createForm() {
    return this.fb.group({
      coupon: this.fb.control('', {
        validators: [Validators.required],
        asyncValidators: [this.couponValidator.validate.bind(this.couponValidator)],
      }),
    });
  }

  get couponCtrl() {
    return this.couponForm.controls.coupon;
  }

  couponForm = this.createForm();

  handleSubmit() {
    console.log(this.couponCtrl.value, ' Value');
    console.log(this.couponForm.getRawValue());
    this.discountService.removeDiscount(`${this.couponCtrl.value}`);
    this.couponForm.reset();
  }

  ngOnInit() {
    this.couponForm.controls.coupon.valueChanges.pipe(debounceTime(1000));
  }
}
