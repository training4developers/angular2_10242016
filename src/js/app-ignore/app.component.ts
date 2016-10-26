import { Component, Input } from '@angular/core';

let childDemoCounter: number = 0;

@Component({
	selector: 'child-demo",
	template: '<h2>{{childHeader}}</h2>'
})
export class ChildDemoComponent {

	constructor() {
		childDemoCounter++;
		console.log(childDemoCounter);
	}

	@Input()
	childHeader: string;

}

@Component({
	selector: 'my-app',
	template: '<h1>Parent Demo</h1><child-demo [childHeader]="parentHeader"></child-demo>'
})
export class AppComponent {

	parentHeader: string = "My Very Cool App!";

}

