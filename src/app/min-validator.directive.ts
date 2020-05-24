import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true }]
})
export class MinValidatorDirective implements Validator {
  @HostBinding('attr.min') @Input() min: number;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = Validators.min(this.min);
    return validator(control);
  }
}
