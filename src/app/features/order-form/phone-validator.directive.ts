import { Directive, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[error][formControlName]',
})
export class PhoneValidatorDirective {
  control = inject(NgControl);
  @HostBinding('class.error') get valid() {
    return this.control.errors && this.control.touched ? true : false;
  }
}
