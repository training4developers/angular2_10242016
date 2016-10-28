import { Component, Pipe, PipeTransform, DoCheck } from '@angular/core';

@Pipe({
	name: 'myUpperCase',
	pure: true
})
export class MyUpperCasePipe implements PipeTransform {

	transform(value: any, num: number) {
		console.log('pipe executed');
		return String(value).toUpperCase();
	}

}

@Component({
	selector: 'my-app',
	template: `<input type="text" [(ngModel)]="demo">
	<div>{{message | myUpperCase:2}}</div>`
})
export class AppComponent implements DoCheck {

	demo: string = '';
	message: string = 'Have an awesome weekend!';

	ngDoCheck() {
		console.log('change detection ran');
	}
}
