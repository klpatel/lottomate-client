import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNegativeNumberValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NegativeNumberValidatorDirective, multi: true }
  ]
})

export class NegativeNumberValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    /* check validation rules */
    if (control.value < 0) {
      console.log("inside validators",control.value);
      return null;
    } else {
      return { appEvenNumberValidator: true };
    }
  }
}
