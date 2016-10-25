import { Injectable } from '@angular/core';

@Injectable()
export class Colors {

	private _lastColors: string[];
	private _colors: string[] = ['green','saffron','white',
		'red','blue','yellow','black','brown'];

	getAll(): string[] {
		if (this._colors !== this._lastColors) {
			console.log('sort colors executed');
			this._colors.sort();
			this._lastColors = this._colors;

		}
		return this._colors;
	}

	insert(newColor: string) {
		this._colors = this._colors.concat(newColor);
	}		

}
