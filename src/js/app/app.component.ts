import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';

import { Observable, Subscription, Observer } from 'rxjs';

// @Injectable()
// export class Counter {

// 	ws: WebSocket;
// 	private _numbers: Observable<number> = null;

// 	constructor() {
// 		this.ws = new WebSocket('ws://localhost:3030');

// 	}

// 	get numbers(): Observable<number> {

// 		if (!this._numbers) {
// 			this._numbers = Observable.create((observer: Observer<number>) => {
// 				this.ws.addEventListener('message', e => {
// 					observer.next(parseInt(e.data));
// 				});
// 			});
// 		}

// 		return this._numbers;
// 	}

// }

@Injectable()
export class Counter {

	ws: WebSocket;
	private _keyValue: Observable<string> = null;

	constructor() {
		this.ws = new WebSocket('ws://localhost:3030');

	}

	get numbers(): Observable<string> {

		if (!this._keyValue) {
			this._keyValue = Observable.create((observer: Observer<string>) => {
				this.ws.addEventListener('message', e => {
					observer.next(String(e.data));
				});
			});
		}

		return this._keyValue;
	}

}

@Component({
	selector: 'my-app',
	template: `<div>{{counterSvc.numbers | async}}</div>`,
	providers: [ Counter ]
})
export class AppComponent implements OnInit, OnDestroy {

	counterUnsubscribe: Subscription;

	constructor(private counterSvc: Counter) { }

	ngOnInit() {
		this.counterUnsubscribe = this.counterSvc.numbers.subscribe(num =>
			console.log(num));
	}

	ngOnDestroy() {
		this.counterUnsubscribe.unsubscribe();
	}
}
