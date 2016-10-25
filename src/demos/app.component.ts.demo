import { Component } from '@angular/core';
import { Colors } from './services/colors';

@Component({
	selector: 'my-app',
	template: require('./app.component.html'),
	styles: [require('./app.component.scss')]
})
export class AppComponent {

	constructor(private colorSvc: Colors) { }

	message: any = { text: 'Color List', important: true, lang: 'en' };
	corporateValue: string = 'bryan';

	birthDate: Date = new Date();
	birthDayCheckAmt: number = 100;
	birthDayList: string[] = ['money','new car','mustang','trip to paris'];
	showMe: boolean = false;
	
	colorFilter: string = '';
	newColor: string = '';
	colors: string[];
	lastColors: string[];
	filteredColors: Map<string, string[]> = new Map<string, string[]>();


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

