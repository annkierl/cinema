import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminShowForm } from './AdminFormShow.interface';

@Injectable()
export class AdminFormShowService {
  private builder = inject(NonNullableFormBuilder);
  private adminFormShow = this.createForm();
  private createForm() {
    return this.builder.group<AdminShowForm>({
      adminShowForm: this.builder.group({
        day: this.builder.control('', {
          validators: [Validators.required],
        }),
      }),
    });
  }
  getForm(): FormGroup<AdminShowForm> {
    return this.adminFormShow;
  }
}
