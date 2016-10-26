import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'view-item',
	template: `<span>{{item}}</span>
	<button type="button" (click)="edit()">Edit</button>`
})
export class ViewItemComponent {

	@Input()
	item: string;

	@Output()
	editItem: EventEmitter<string> = new EventEmitter<string>();

	edit() {
		this.editItem.emit(this.item);
	}

}

@Component({
	selector: 'edit-item',
	template: `<span>
		<input type="text" [(ngModel)]="editItem">
	</span><button type="button" (click)="save()">Save</button>`
})
export class EditItemComponent implements OnInit {

	editItem: string;

	@Input()
	item: string;

	ngOnInit() {
		this.editItem = this.item;
	}

	@Output()
	saveItem: EventEmitter<string> = new EventEmitter<string>();

	save() {
		this.saveItem.emit(this.editItem);
	}

}

@Component({
	selector: 'item-list',
	template: `<ul>
		<li *ngFor="let item of items">
			<view-item *ngIf="itemToEdit !== item" [item]="item"
				(editItem)="editItem($event)"></view-item>
			<edit-item *ngIf="itemToEdit === item" [item]="item"
				(saveItem)="saveItem($event)"></edit-item>
		</li>
	</ul>`
})
export class ItemListComponent {

	itemToEdit: string = '';

	@Input()
	items: string[];

	editItem(item: string) {
		this.itemToEdit = item;
	}

	saveItem(item: string) {
		this.items.splice(this.items.indexOf(this.itemToEdit), 1, item);
		this.itemToEdit = '';
	}

}


@Component({
	selector: 'my-app',
	template: `<item-list [items]="colors"></item-list>`
})
export class AppComponent {

	colors: string[] = [ 'red', 'blue', 'orange', 'yellow' ];

}

