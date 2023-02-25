import { FormControl, FormGroup } from '@angular/forms';

export interface AdminHallForm {
  adminHallForm: FormGroup<AdminHallTypeForm>;
}
export interface AdminHallTypeForm {
  hall: FormControl<string>;
}
