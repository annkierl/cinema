import { AbstractControl, ValidatorFn } from '@angular/forms';

export const noWhiteSpaceValidator: ValidatorFn = (control: AbstractControl) => {
  if (control.value.startsWith(' ') || control.value.endsWith(' ')) {
    return { leadingOrTrailingSpace: true };
  }
  if (control.value.includes('  ')) {
    return { tooManySpaces: true };
  }
  return null;
};
