import { FormControl, FormGroup } from '@angular/forms';

export interface AdminAddHourForm {
  adminHour: FormGroup<AdminHourTypeForm>;
}
export interface AdminHourTypeForm {
  hour: FormControl<string>;
}

export type adminHour = FormGroup<{
  hour: FormControl<string>;
}>;
