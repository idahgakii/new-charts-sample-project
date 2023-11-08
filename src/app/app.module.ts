import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ChartModule} from "primeng/chart";
import {MessageService} from "primeng/api";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        ChartModule,
        RadioButtonModule,
        FormsModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
