import { FormControl, FormGroup } from '@angular/forms';

export interface AdminShowForm {
  adminShowForm: FormGroup<AdminShowTypeForm>;
}
export interface AdminShowTypeForm {
  day: FormControl<string>;
}
