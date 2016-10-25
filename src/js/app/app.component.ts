import { Component, Injectable } from '@angular/core';

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

@Component({
	selector: 'my-app',
	template: `<div>
		<h1>{{message | lowercase}}</h1>
		Show Me: <input type="checkbox" [(ngModel)]="showMe">
		<div *ngIf="showMe">
			You can see me!
		</div>
		<div>
			<label for="color-filter">Filter:</label>
			<input type="text" id="color-filter" [(ngModel)]="colorFilter">
		</div>
		<ul>
			<li *ngFor="let color of sortedColors">{{color}}</li>
		</ul>
		<div>
			<label for="new-color">New Color:</label>
			<input type="text" id="new-color" [(ngModel)]="newColor">
			<button type="button" (click)="addColor()">Add Color</button>
		</div>
	</div>`
})
export class AppComponent {

	constructor(private colorSvc: Colors) { }

	message: string = 'Color List';

	showMe: boolean = false;
	
	colorFilter: string = '';
	newColor: string = '';
	colors: string[];
	lastColors: string[];
	filteredColors: Map<string, string[]>
		= new Map<string, string[]>();


	addColor() {
		this.colorSvc.insert(this.newColor);
	}

	get sortedColors() {

		this.colors = this.colorSvc.getAll();

		if (this.colors !== this.lastColors) {
			this.filteredColors.clear();
			this.lastColors = this.colors;
		}

		if (!this.filteredColors.has(this.colorFilter)) {
			console.log('filter colors executed');
			this.filteredColors.set(
				this.colorFilter,
				this.colorSvc.getAll().filter(color => color.startsWith(this.colorFilter)));
		}

		return this.filteredColors.get(this.colorFilter);
	}
}

