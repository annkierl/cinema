import { FormControl, FormGroup } from '@angular/forms';

export type dataForOrder = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  repeatEmail: FormControl<string>;
}>;
