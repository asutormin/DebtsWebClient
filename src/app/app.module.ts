import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CommonComponent } from './common/common.component';
import { DinnersComponent } from './dinners/dinners.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DebtTableComponent } from './shared/debt-table/debt-table.component';
import { TravelsComponent } from './travels/travels.component';
import { TicketsComponent } from './tickets/tickets.component';
import { EventsComponent } from './events/events.component';
import { FitnessComponent } from './fitness/fitness.component';
import { LoansComponent } from './loans/loans.component';
import { ActsComponent } from './acts/acts.component';
import { LoginComponent } from './login/login.component';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CommonComponent,
    DinnersComponent,
    DebtTableComponent,
    TravelsComponent,
    TicketsComponent,
    EventsComponent,
    FitnessComponent,
    LoansComponent,
    ActsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
