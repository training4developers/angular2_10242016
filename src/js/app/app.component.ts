import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import * as RxJS from 'rxjs';

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
	template: '<ul><li *ngFor="let book of books" [row-book]="book"></li></ul>'
})
export class AppComponent implements OnInit {

	constructor(private http: Http) { }

	books: any[];

	ngOnInit() {

		const bookId = 2;

		this.http.get(`http://localhost:3010/books/${encodeURIComponent(bookId.toString())}`).toPromise().then(res => {
			console.dir(res.json());
		});

		const headers = new Headers({ 'Content-Type': 'application/json' });
		const requestOptions = new RequestOptions({
			headers
		});

		this.http.put('http://localhost:3010/books/2', JSON.stringify({
			title: 'New Book'
		}), requestOptions).toPromise().then(res => {
			console.dir(res.json());
		}).catch(err => { 
		});
		
	}

}
