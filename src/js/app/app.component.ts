import { Component, OnInit, Injectable } from '@angular/core';


export class FirstService {
	doIt() {
		console.log('did it!');
	}
}

@Component({
	selector: 'my-app',
	template: '',
	providers: [ FirstService ]
})
export class AppComponent implements OnInit {

	constructor(private firstSvc: FirstService) { }

	ngOnInit() {
		this.firstSvc.doIt();
	}

}
