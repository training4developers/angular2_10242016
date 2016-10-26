import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms'

const betterNumberValidator = (fc: FormControl): any => {

	console.log('better number validator');
	if (!(fc.value == null || String(fc.value).length === 0)) {
		if (!parseInt(fc.value) || !parseFloat(fc.value)) {
			return {
				validBetterNumber: false
			};
		}
	}

	// no validation error
	return null;
};

@Directive({
	selector: '[betterNumber][ngModel]',
	providers: [{
		provide: NG_VALIDATORS, useValue: betterNumberValidator, multi: true
	}]
})
export class BetterNumberDirective { }