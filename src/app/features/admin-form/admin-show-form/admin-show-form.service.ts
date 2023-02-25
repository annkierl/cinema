import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, map, tap } from 'rxjs';
import { AdminShowForm, AdminShowTypeForm } from '../adminForm.interface';

@Injectable()
export class AdminFormService {
  private builder = inject(NonNullableFormBuilder);
  private adminShowForm = this.createForm();
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
    return this.adminShowForm;
  }
}
