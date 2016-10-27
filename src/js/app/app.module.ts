import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '../../css/styles.scss';

import {
	AppComponent, FirstService, SecondService, ChildDemo, ChildDemo2, ChildDemo3
} from './app.component';


@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [ AppComponent, ChildDemo, ChildDemo2, ChildDemo3 ],
	providers: [ { provide: FirstService, useClass: FirstService }, SecondService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }