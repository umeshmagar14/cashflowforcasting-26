import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CashFlowProjectionComponent } from './cash-flow-projection/cash-flow-projection.component';

@NgModule({
  declarations: [
    AppComponent,
    CashFlowProjectionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }