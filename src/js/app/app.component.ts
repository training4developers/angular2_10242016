import { Component, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

enum HorizontalAlignment {
	Left, Center, Right
}

enum ColumnType {
	String, Number, Currency, Color, Year, Lookup
}

interface SelectOption {
	value: number,
	caption: string
}

const noop = () => { };

export class BaseDataColumnEditComponent implements ControlValueAccessor {

	private _data: string;
	
	blur() {
		this.propagateTouched();
	}

	get data(): string {
		return this._data;
	};

	set data(value: string) {
		this._data = value;
		this.propagateChange(this._data);
	};

	propagateChange = (_: any) => {};
	propagateTouched = () => {};

  writeValue(value: any) {
		if (value !== undefined) {
	    this.data = value;
		}
  }

	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any) {
		this.propagateTouched = fn;
	}

}

@Component({
	selector: 'data-column-view-string',
	template: `{{data}}`
})
export class DataColumnViewStringComponent {

	@Input()
	data: string;
}

@Component({
	selector: 'data-column-edit-string',
	template: `<input type="text" [(ngModel)]="data" (blur)="blur()">`,
	styles: [ 'input { width: 100px }' ],
	providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataColumnEditStringComponent),
    multi: true
	}]
})
export class DataColumnEditStringComponent extends BaseDataColumnEditComponent { }

@Component({
	selector: 'data-column-view-currency',
	template: `{{data | currency:currencyCode:true:'2.2'}}`
})
export class DataColumnViewCurrencyComponent {

	@Input()
	data: number;

	@Input('currency')
	currencyCode: string = 'USD';
}

@Component({
	selector: 'data-column-edit-currency',
	template: `<input type="number" [(ngModel)]="data" (blur)="blur()">`,
	styles: [ 'input { width: 100px }' ],
	providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataColumnEditCurrencyComponent),
    multi: true
	}]
})
export class DataColumnEditCurrencyComponent extends BaseDataColumnEditComponent { }


@Component({
	selector: 'data-column-view-number',
	template: `{{data | number:numberFormat}}`
})
export class DataColumnViewNumberComponent {

	@Input()
	data: number;

	@Input('format')
	numberFormat: string = '2.0';
}

@Component({
	selector: 'data-column-edit-number',
	template: `<input type="number" [(ngModel)]="data" (blur)="blur()">`,
	styles: [ 'input { width: 100px }' ],
	providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataColumnEditNumberComponent),
    multi: true
	}]
})
export class DataColumnEditNumberComponent extends BaseDataColumnEditComponent { }

@Component({
	selector: 'data-column-view-lookup',
	template: `{{lookup(data)}}`
})
export class DataColumnViewLookupComponent {

	@Input()
	data: number;

	@Input()
	options: SelectOption[];


	lookup(data: number) {
		return this.options.find(option => option.value === data).caption;
	}
}

@Component({
	selector: 'data-column-view-color',
	template: `<div [ngStyle]="{ 'background-color':data }"></div>`,
	styles: [
		'div { width:50px; height:20px; display:inline-block; }'
	]
})
export class DataColumnViewColorComponent {

	@Input()
	data: string;
}

@Component({
	selector: 'data-column-edit-color',
	template: `<input type="color" [(ngModel)]="data" (blur)="blur()">`,
	providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DataColumnEditColorComponent),
    multi: true
	}]
})
export class DataColumnEditColorComponent extends BaseDataColumnEditComponent { }

@Component({
	selector: 'data-column-view-buttons',
	template: `<button type="button" (click)="editRow.emit($event)">Edit</button>
		<button type="button" (click)="deleteRow.emit($event)">Delete</button>`
})
export class DataColumnViewButtonsComponent {

	@Output()
	editRow: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	@Output()
	deleteRow: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}

@Component({
	selector: 'data-column-edit-buttons',
	template: `<button type="button" (click)="saveRow.emit($event)">Save</button>
		<button type="button" (click)="cancelRow.emit($event)">Cancel</button>`
})
export class DataColumnEditButtonsComponent {

	@Output()
	saveRow: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	@Output()
	cancelRow: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}

@Component({
	selector: 'data-table',
	template: `<table [class]="config.classNames.join(' ')">
		<caption *ngIf="config.caption">{{config.caption}}</caption>
		<thead>
			<tr>
				<th *ngFor="let column of config.columns" [ngStyle]="{'text-align':align(column.headerAlign)}">
					{{column.header}}
				</th>
				<th *ngIf="config.inlineEditing">
					Action
				</th>
			</tr>
		</thead>
		<tbody>
			<tr *ngFor="let row of data">

				<td *ngFor="let column of config.columns" [ngStyle]="{'text-align':align(column.fieldAlign)}">

					<span *ngIf="!config.inlineEditing || editRowId !== row[config.idField]" [ngSwitch]="column.type">
						<data-column-view-number *ngSwitchCase=" ${ColumnType.Number} "
							[data]="row[column.field]" [format]='column.format'></data-column-view-number>
						<data-column-view-currency *ngSwitchCase=" ${ColumnType.Currency} "
							[data]="row[column.field]" [currency]='column.currency'></data-column-view-currency>
						<data-column-view-lookup *ngSwitchCase=" ${ColumnType.Lookup} "
							[data]="row[column.field]" [options]='column.options'></data-column-view-lookup>
						<data-column-view-color *ngSwitchCase=" ${ColumnType.Color} "
							[data]="row[column.field]"></data-column-view-color>
						<data-column-view-string *ngSwitchDefault
							[data]="row[column.field]"></data-column-view-string>
					</span>

					<span *ngIf="config.inlineEditing && editRowId === row[config.idField]" [ngSwitch]="column.type">
						<data-column-edit-number *ngSwitchCase=" ${ColumnType.Number} "
							[(ngModel)]="rowEdit[column.field]"></data-column-edit-number>
						<data-column-edit-currency *ngSwitchCase=" ${ColumnType.Currency} "
							[(ngModel)]="rowEdit[column.field]"></data-column-edit-currency>
						<data-column-edit-color *ngSwitchCase=" ${ColumnType.Color} "
							[(ngModel)]="rowEdit[column.field]"></data-column-edit-color>
						<data-column-edit-string *ngSwitchDefault
							[(ngModel)]="rowEdit[column.field]"></data-column-edit-string>
					</span>

				</td>

				<td *ngIf="config.inlineEditing" class="action-buttons">
					<data-column-view-buttons
						(editRow)="editRow(row[config.idField])"
						(deleteRow)="deleteRow(row[config.idField])"
						*ngIf="editRowId !== row[config.idField]"></data-column-view-buttons>
					<data-column-edit-buttons
						(saveRow)="saveRow()"
						(cancelRow)="cancelRow()"
						*ngIf="editRowId === row[config.idField]"></data-column-edit-buttons>
				</td>

			</tr>
		</tbody>
	</table>`,
	styles: [
		':host { border: 1px solid black }',
		'caption { color:black; caption-side:top; font-size:1.1rem; }',
		'th, .action-buttons  { text-align:center }'
	]
})
export class DataTableComponent {

	align(alignment: HorizontalAlignment) {
		switch(alignment) {
			case HorizontalAlignment.Center:
				return 'center';
			case HorizontalAlignment.Right:
				return 'right';
			default:
				return 'left';
		}
	}

	editRowId: number = 0;
	rowEdit: any = {};

	@Input()
	config: any;

	@Input()
	data: any[];

	editRow(rowId: number) {
		this.editRowId = rowId;
		this.rowEdit = Object.assign({}, this.data.find(row => row[this.config.idField] === rowId));
	}

	deleteRow(rowId: number) {
		this.data.splice(this.data.find(row => row[this.config.idField] === rowId), 1);
	}

	saveRow() {
		Object.assign(this.data.find(row => row[this.config.idField] === this.editRowId), this.rowEdit);
		this.editRowId = 0;
	}

	cancelRow() {
		this.rowEdit = {};
		this.editRowId = 0;
	}

}

const columnConfig = (
	header: string,
	field: string,
	type: ColumnType = ColumnType.String,
	fieldAlign: HorizontalAlignment = HorizontalAlignment.Left,
	headerAlign: HorizontalAlignment = HorizontalAlignment.Center,
	options: any = {}
) => {

	return Object.assign({
		header,
		field,
		type,
		fieldAlign,
		headerAlign
	}, options);

};


@Component({
	selector: 'my-app',
	template: `<div class="row flex-items-xs-center">
		<div class="col-xs-2"></div>
		<data-table class="col-xs-8" [config]="carTableConfig" [data]="carData"></data-table>
		<div class="col-xs-2"></div>
	</div>`
})
export class AppComponent {

	carMakeOptions: SelectOption[]  = [
		{ value: 1, caption: 'Ford' },
		{ value: 2, caption: 'Chevrolet' },
		{ value: 3, caption: 'Dodge' }
	];

	carTableConfig: any = {
		classNames: ['table', 'table-striped'],
		caption: 'Car Inventory',
		inlineEditing: true,
		idField: 'id',
		columns: [
			columnConfig('Make', 'make', ColumnType.Lookup,
				HorizontalAlignment.Left, HorizontalAlignment.Center, { options: this.carMakeOptions }),
			columnConfig('Model', 'model'),
			columnConfig('Year', 'year', ColumnType.Year, HorizontalAlignment.Center),
			columnConfig('Color', 'color', ColumnType.Color, HorizontalAlignment.Center),
			columnConfig('Price', 'price', ColumnType.Currency,
				HorizontalAlignment.Right, HorizontalAlignment.Center, { currency: 'EUR' })
		]
	};

	carData: any[] = [
		{ id: 1, make: 1, model: 'Fusion', year: 2015, color: '#ffffff', price: 12950 },
		{ id: 2, make: 2, model: 'Tahoe', year: 2014, color: '#0000ff', price: 42950 },
		{ id: 3, make: 3, model: 'Viper', year: 2016, color: '#ff0000', price: 52500 }
	];

}