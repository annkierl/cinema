import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoSpaceDirective } from '@shared/no-space.directive';
import { debounceTime } from 'rxjs';

import { TotalCostService } from '../total-cost/total-cost.service';
import { Discount } from './discount.initial';
import { DiscountStateFullService } from './discount-statefull-service';
import { CouponValidator } from './discount-validator.validator';
@Component({
  selector: 'app-discount-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NoSpaceDirective],
  templateUrl: './discountForm.html',
  styleUrls: ['./discountForm.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountFormComponent {
  @Input() discounts!: Discount[];

  private fb = inject(NonNullableFormBuilder);
  private couponValidator = inject(CouponValidator);
  private discountStateService = inject(DiscountStateFullService);
  private totaCostService = inject(TotalCostService);
  private createForm() {
    return this.fb.group({
      coupon: this.fb.control('', {
        validators: [Validators.required],
        asyncValidators: [this.couponValidator.validate.bind(this.couponValidator)],
      }),
    });
  }

  couponForm = this.createForm();

  get couponCtrl() {
    return this.couponForm.controls.coupon;
  }

  handleSubmit() {
    this.discountStateService.removeDiscountUpdateState(`${this.couponCtrl.value}`);
    this.couponForm.reset();
    this.totaCostService.TotalCostDiscount();
  }

  ngOnInit() {
    this.couponForm.controls.coupon.valueChanges.pipe(debounceTime(1000));
  }
}
