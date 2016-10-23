import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Component declarations
import { AppComponent }   from './app.component';

// Other declarations
import { routing } from './app.routing';

import './rxjs-extensions';

@NgModule({
  imports: [
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    routing
  ],

  declarations: [
  	AppComponent
  ],

  providers: [
  ],

  bootstrap: [
  	AppComponent
  ]
})
export class AppModule { }
