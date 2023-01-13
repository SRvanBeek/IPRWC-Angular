import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from "rxjs";

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

  static validUrl(control: FormControl): {[s: string]: boolean} {
      let imageUrl = control.value;
      let invalid: boolean;
      try {
        imageUrl = new URL(imageUrl);
        invalid = false
      } catch (_) {
        invalid = true;
      }

      if (invalid) {
        console.log("invalid")
        return {'invalidUrl': true}
      }
      else {
        return null
      }
    };

  static numberValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve) => {
      if (isNaN(control.value)) {
        resolve({isNumber: false});
      } else {
        resolve(null);
      }
    });
  };
}
