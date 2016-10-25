import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import '../../css/styles.scss';

import { AppComponent } from './app.component';
import { Colors } from './services/colors';
import { BetterNumberDirective } from './directives/better-number.directive';

@NgModule({
	imports: [ BrowserModule, FormsModule ],
	declarations: [ AppComponent, BetterNumberDirective ],
	providers: [ Colors ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }