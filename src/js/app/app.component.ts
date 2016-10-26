import { Component, Input, Output, EventEmitter } from '@angular/core';

interface MessageForm {
	message: string;
}

@Component({
	selector: 'child-demo',
	template: `<h3>{{childHeader}}</h3>
	<input type="text" [(ngModel)]="message">
	<button type="button" (click)="clickItOrTicket()">
		Click It or Ticket!
	</button>`
})
export class ChildDemoComponent {
	private _clickCounter: number = 0;
	message: string = "";
	clickItOrTicket() {
		this.clickMe.emit(<MessageForm>{ message: this.message });
	}
	@Input()
	childHeader: string;
	@Output()
	clickMe: EventEmitter<MessageForm> = new EventEmitter<MessageForm>();
}

@Component({
	selector: 'my-app',
	template: `<h1>Parent Demo</h1>
	<child-demo [childHeader]="parentHeader"
	(clickMe)="childClicked($event)"></child-demo>`
})
export class AppComponent {

	parentHeader: string = 'Child Demo';

	childClicked(messageForm: MessageForm) {
		console.log('parent: child was clicked');
		console.log(messageForm.message);
	}
}

