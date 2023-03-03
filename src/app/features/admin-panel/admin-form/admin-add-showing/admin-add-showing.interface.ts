import { FormControl, FormGroup } from '@angular/forms';

export interface AdminMovieListForm {
  adminMovieList: FormGroup<AdminMovieListTypeForm>;
}
export interface AdminMovieListTypeForm {
  movie: FormControl<string>;
}

export type AdminAddScreening = FormGroup<{
  movie: FormControl<string>;
  day: FormControl<string>;
  hall: FormControl<string>;
  hour: FormControl<string>;
}>;
