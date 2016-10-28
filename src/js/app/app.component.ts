import { Component, OnInit, Input, Injectable, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable, Subscription } from 'rxjs';

interface Book {
	id: number;
	title: string;
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
	template: '<ul><li *ngFor="let book of bookList" [row-book]="book"></li></ul>',
	providers: [ Books ]
})
export class AppComponent implements OnInit, OnDestroy {

	constructor(private bookSvc: Books) { }

	bookList: Book[];

	booksSubscription: Subscription;

	ngOnDestroy() {
		this.booksSubscription.unsubscribe();
	}

	ngOnInit() {

		this.booksSubscription = this.bookSvc.getAll().subscribe(books =>
			this.bookList = books);

		// const bookId = 2;

		// this.http.get(`http://localhost:3010/books/${encodeURIComponent(bookId.toString())}`).toPromise().then(res => {
		// 	console.dir(res.json());
		// });

		// const headers = new Headers({ 'Content-Type': 'application/json' });
		// const requestOptions = new RequestOptions({
		// 	headers
		// });

		// insert a book
		// this.http.post('http://localhost:3010/books', JSON.stringify({
		// 	title: 'New Book'
		// }), requestOptions).toPromise().then(res => {
		// 	console.dir(res.json());
		// }).catch(err => { 
		// });
		
	}

}
