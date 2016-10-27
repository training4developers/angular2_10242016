import { Component, OnInit, Injectable } from '@angular/core';

@Injectable()
export class SecondService {
	doIt2() {
		console.log('did it 2!');
	}
}

@Injectable()
export class FirstService {

	constructor(private secondSvc: SecondService) { }

	doIt() {
		console.log('did it!');
		this.secondSvc.doIt2();
	}
}

const altFirstService = {
	doIt: () => console.log('alternate first service')
};

const useFirstSvcAlt = false;

const firstServiceFactory = (secondSvc: SecondService) => {
	if (useFirstSvcAlt) {
		return altFirstService;
	} else {
		return new FirstService(secondSvc);
	}
};

@Component({
	selector: 'my-app',
	template: '',
	providers: [{
		provide: FirstService, useFactory: firstServiceFactory, deps: [ SecondService ]
	},
	SecondService ]
})
export class AppComponent implements OnInit {

	constructor(private firstSvc: FirstService) { }

	ngOnInit() {
		this.firstSvc.doIt();
	}

}
