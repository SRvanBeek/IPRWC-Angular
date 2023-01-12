import {AbstractControl, ValidatorFn} from '@angular/forms';

export default class Validation {

  static match(controlName: string, matchControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);

      if (matchControl?.errors && !matchControl.errors['matching']) {
        return null;
      }

      if (control?.value !== matchControl?.value) {
        controls.get(matchControlName)?.setErrors({matching: true});
        return {matching: true};
      } else {
        return null;
      }
    };
  }
}
