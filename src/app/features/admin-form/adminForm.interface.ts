import { FormControl, FormGroup } from '@angular/forms';
export interface AdminForm {
  adminForm: FormGroup<AdminTypeForm>;
}
export interface AdminTypeForm {
  title: FormControl<string>;
  linkToPoster: FormControl<string>;
  time: FormControl<string>;
  cathegory: FormControl<string>;
  shortDesc: FormControl<string>;
  longDesc: FormControl<string>;
}
