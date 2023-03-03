import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminValidator } from './admin-add-showing.validator';
import { AdminAddScreening, AdminMovieListForm } from './admin-add-showing.interface';

@Injectable()
export class AdminMovieListService {
  private builder = inject(NonNullableFormBuilder);
  private adminValidator = inject(AdminValidator);
  private adminMovieListForm = this.createForm();
  private adminAddSreeningForm = this.createFormForScreening();

  private createForm() {
    return this.builder.group<AdminMovieListForm>({
      adminMovieList: this.builder.group({
        movie: this.builder.control('', {
          validators: [Validators.required],
        }),
      }),
    });
  }

  private createFormForScreening(): AdminAddScreening {
    return this.builder.group({
      movie: this.builder.control('', {
        validators: [Validators.required],
      }),
      day: this.builder.control('', {
        validators: [Validators.required],
      }),
      hall: this.builder.control('', {
        validators: [Validators.required],
      }),
      hour: this.builder.control('', {
        validators: [Validators.required],
        asyncValidators: [this.adminValidator.validate.bind(this.adminValidator)],
        updateOn: 'blur',
      }),
    });
  }

  getForm(): FormGroup<AdminMovieListForm> {
    return this.adminMovieListForm;
  }

  getFormAdmin() {
    return this.adminAddSreeningForm;
  }
}
