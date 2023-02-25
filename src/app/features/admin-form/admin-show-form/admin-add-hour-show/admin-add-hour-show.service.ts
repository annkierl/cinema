import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminAddHourForm, adminHour } from './admin-add-hour-show.interface';
import { AdminValidator } from './admin-add-hour-show.validator';

@Injectable()
export class AdminAddHallFormService {
  private builder = inject(NonNullableFormBuilder);
  private adminValidator = inject(AdminValidator);
  private adminHourForm = this.createForm();

  private createForm(): adminHour {
    return this.builder.group(
      {
        hour: this.builder.control('', {
          validators: [Validators.required],
          asyncValidators: [this.adminValidator.validate.bind(this.adminValidator)],
          updateOn: 'blur',
        }),
      },
      {}
    );
  }
  getForm() {
    return this.adminHourForm;
  }
}
