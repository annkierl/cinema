import { FormControl, FormGroup } from '@angular/forms';

export interface AdminMovieListForm {
  adminMovieList: FormGroup<AdminMovieListTypeForm>;
}
export interface AdminMovieListTypeForm {
  movie: FormControl<string>;
}
