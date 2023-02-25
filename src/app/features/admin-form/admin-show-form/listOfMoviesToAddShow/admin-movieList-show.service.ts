import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminMovieListForm } from './admin-movieList-show.interface';

@Injectable()
export class AdminMovieListService {
  private builder = inject(NonNullableFormBuilder);
  private adminMovieListForm = this.createForm();
  private createForm() {
    return this.builder.group<AdminMovieListForm>({
      adminMovieList: this.builder.group({
        movie: this.builder.control('', {
          validators: [Validators.required],
        }),
      }),
    });
  }
  getForm(): FormGroup<AdminMovieListForm> {
    return this.adminMovieListForm;
  }
}
