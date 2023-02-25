import { Directive, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[error][formControlName], [error][formControl]',
})
export class InputvalidatorDirective {
  control = inject(NgControl);
  @HostBinding('class.error') get valid() {
    return this.control.errors && this.control.touched ? true : false;
  }
}
