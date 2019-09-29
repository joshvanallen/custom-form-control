import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { JVACustomFormControlComponent } from './form-control/custom-form-control.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent,  JVACustomFormControlComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
