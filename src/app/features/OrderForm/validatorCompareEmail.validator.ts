import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatorCompareEmail(email: string, reapeatEmail: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailvalid = control.get(email);
    const repeatemailvalid = control.get(reapeatEmail);

    return emailvalid && repeatemailvalid && repeatemailvalid.value === emailvalid.value ? null : { missMatch: true };
  };
}
