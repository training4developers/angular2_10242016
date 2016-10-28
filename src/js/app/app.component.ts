import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

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

		this.http.get('http://localhost:3010/books').toPromise().then(res => {
			this.books = res.json();
		});
		
	}

}
