import { Component, OnInit, Injectable,
	OpaqueToken, Inject } from '@angular/core';

interface MyService {
	doIt(componentName: string) : void;
}

const MyServiceToken = new OpaqueToken("MyService");



@Injectable()
export class SecondService {
	doIt2() {
		console.log('did it 2!');
	}
}

let firstServiceInstanceCount: number = 0;

@Injectable()
export class FirstService implements MyService {

	localId: number = 0;

	constructor(private secondSvc: SecondService) {
		this.localId = ++firstServiceInstanceCount;
		console.log('new instance of first service');
	}

	doIt(componentName: string) {
		console.log(`first service instance id: ${this.localId}, component: ${componentName}`);
		console.log('did it!');
		this.secondSvc.doIt2();
	}
}

@Component({
	selector: 'child-demo',
	template: 'Child Demo<child-demo3></child-demo3>',
	providers: [ { provide: MyServiceToken, useExisting: FirstService } ]
})
export class ChildDemo implements OnInit {

	constructor(@Inject(MyServiceToken) private firstSvc: MyService) { }

	ngOnInit() {
		this.firstSvc.doIt('child-demo');
	}	

}

@Component({
	selector: 'child-demo2',
	template: 'Child Demo 2'
})
export class ChildDemo2 implements OnInit {

	constructor(private firstSvc: FirstService) { }

	ngOnInit() {
		this.firstSvc.doIt('child-demo2');
	}	

}

@Component({
	selector: 'child-demo3',
	template: 'Child Demo 3'
})
export class ChildDemo3 implements OnInit {

	constructor(private firstSvc: FirstService) { }

	ngOnInit() {
		this.firstSvc.doIt('child-demo3');
	}	

}

@Component({
	selector: 'my-app',
	template: 'App<child-demo></child-demo><child-demo2></child-demo2>',
	// template: '',
	// providers: [
	// 	{ provide: MyServiceToken, useClass: FirstService }
	// ]
})
export class AppComponent implements OnInit {

	// constructor(@Inject(MyServiceToken) private mySvc: MyService) { }
	constructor(private mySvc: FirstService) { }

	ngOnInit() {
		this.mySvc.doIt('app');
	}

}
