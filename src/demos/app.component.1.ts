import { Component, OnInit, Input, Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable, Subscription, Observer } from 'rxjs';

interface Book {
	id: number;
	title: string;
}

@Injectable()
export class Counter {

	ws: WebSocket;
	private _numbers: Observable<number> = null;

	constructor() {
		this.ws = new WebSocket('ws://localhost:3030');

	}

	get numbers(): Observable<number> {

		if (!this._numbers) {
			this._numbers = Observable.create((observer: Observer<number>) => {
				this.ws.addEventListener('message', e => {
					observer.next(parseInt(e.data));
				});
			});
		}

		return this._numbers;
	}

}

@Injectable()
export class Books {

	private baseUrl: string = 'http://localhost:3010/books'

	constructor(private http: Http) { }

	getAll(): Observable<Book[]> {
		return this.http.get(this.baseUrl).map(res => {
			return <Book[]>res.json();
		});
	}

}

@Component({
	selector: 'li[row-book]',
	template: '<b>{{book.title}}</b>'
})
export class RowBook {

	@Input('row-book')
	book: any;
}

@Component({
	selector: 'my-app',
	template: '<div>{{counterSvc.numbers | async}}</div><ul><li *ngFor="let book of bookList" [row-book]="book"></li></ul>',
	providers: [ Books, Counter ]
})
export class AppComponent implements OnInit, OnDestroy {

	counterUnsubscribe: Subscription;

	constructor(private bookSvc: Books, private counterSvc: Counter) { }

	ngOnInit() {
		this.counterUnsubscribe = this.counterSvc.numbers.subscribe(num =>
			console.log(num));
	}

	ngOnDestroy() {
		this.counterUnsubscribe.unsubscribe();
	}

	// refresh() {

	// 	// this.booksSubscription = this.bookSvc.getAll().subscribe(books => {
	// 	// 	this.bookList = books;
	// 	// 	this.booksSubscription.unsubscribe();
	// 	// });

	// 	return this.bookSvc.getAll().toPromise().then(books => {
	// 		return this.bookList = books;
	// 	});
	// }


	// bookList: Book[];

	// booksSubscription: Subscription;

	// ngOnDestroy() {
	// 	this.booksSubscription.unsubscribe();
	// }

	// ngOnInit() {

	// 	this.refresh().then(function() {
	// 	});

	// 	this.refresh();

	// 	// const bookId = 2;

	// 	// this.http.get(`http://localhost:3010/books/${encodeURIComponent(bookId.toString())}`).toPromise().then(res => {
	// 	// 	console.dir(res.json());
	// 	// });

	// 	// const headers = new Headers({ 'Content-Type': 'application/json' });
	// 	// const requestOptions = new RequestOptions({
	// 	// 	headers
	// 	// });

	// 	// insert a book
	// 	// this.http.post('http://localhost:3010/books', JSON.stringify({
	// 	// 	title: 'New Book'
	// 	// }), requestOptions).toPromise().then(res => {
	// 	// 	console.dir(res.json());
	// 	// }).catch(err => { 
	// 	// });
		
	// }

}
