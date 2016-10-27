import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '../../css/styles.scss';

import {
	AppComponent, DataTableComponent, DataColumnViewStringComponent,
	DataColumnViewCurrencyComponent, DataColumnViewNumberComponent,
	DataColumnViewLookupComponent, DataColumnViewButtonsComponent,
	DataColumnEditButtonsComponent, DataColumnEditStringComponent,
	DataColumnEditNumberComponent, DataColumnEditCurrencyComponent,
	DataColumnEditColorComponent, DataColumnViewColorComponent
} from './app.component';

@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [ AppComponent, DataTableComponent,
		DataColumnViewStringComponent, DataColumnViewCurrencyComponent,
		DataColumnViewNumberComponent, DataColumnViewLookupComponent,
		DataColumnViewButtonsComponent, DataColumnEditButtonsComponent,
		DataColumnEditStringComponent, DataColumnEditNumberComponent,
		DataColumnEditCurrencyComponent, DataColumnEditColorComponent,
		DataColumnViewColorComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }