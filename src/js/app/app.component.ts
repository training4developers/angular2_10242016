import { Component, Injectable, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'my-app',
	template: require('./app.component.html'),
	styles: [require('./app.component.scss')]
})
export class AppComponent {

	header: string = 'app comp header';

	colors: string[] = ['red','blue','yellow','black'];

	send() {
		console.log('test');
	}

}