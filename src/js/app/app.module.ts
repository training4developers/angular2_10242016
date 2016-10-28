import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import '../../css/styles.scss';

import { AppComponent, MyUpperCasePipe } from './app.component';

@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule ],
	declarations: [ AppComponent, MyUpperCasePipe ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }