import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: require('./app.component.html'),
	styles: [require('./app.component.scss')]
})
export class AppComponent {

	firstName: string = '';
	age: number = 13;
	salary: number = 0;
	cubeColor: string = '#92e49b';
	terminationDate: string = '2016-10-14';
	retirementOption: string = 'live in villages';

}

