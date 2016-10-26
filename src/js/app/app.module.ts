import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '../../css/styles.scss';

import {
	AppComponent, ItemListComponent, ViewItemComponent, EditItemComponent
} from './app.component';

import { Colors } from './services/colors';
import { BetterNumberDirective } from './directives/better-number.directive';

@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [ AppComponent, ItemListComponent,
		ViewItemComponent, EditItemComponent, BetterNumberDirective ],
	providers: [ Colors ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }