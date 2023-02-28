import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminForm } from './adminForm.interface';

@Injectable()
export class AdminFormService {
  private builder = inject(NonNullableFormBuilder);
  private adminForm = this.createForm();
  private createForm() {
    return this.builder.group<AdminForm>({
      adminForm: this.builder.group({
        title: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
        }),
        linkToPoster: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
        }),
        time: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)],
        }),
        cathegory: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
        }),
        shortDesc: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
        }),
        longDesc: this.builder.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
        }),
      }),
    });
  }
  getForm(): FormGroup<AdminForm> {
    return this.adminForm;
  }
}
