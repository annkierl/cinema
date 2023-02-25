import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminHallForm } from './adminFormHall.interface';

@Injectable()
export class AdminFormHallService {
  private builder = inject(NonNullableFormBuilder);
  private adminHallForm = this.createForm();
  private createForm() {
    return this.builder.group<AdminHallForm>({
      adminHallForm: this.builder.group({
        hall: this.builder.control('', {
          validators: [Validators.required],
        }),
      }),
    });
  }
  getForm(): FormGroup<AdminHallForm> {
    return this.adminHallForm;
  }
}
