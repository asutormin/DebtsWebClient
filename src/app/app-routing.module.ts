import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {CommonComponent} from './common/common.component';
import {DinnersComponent} from './dinners/dinners.component';
import {TicketsComponent} from './tickets/tickets.component';
import {TravelsComponent} from './travels/travels.component';
import {EventsComponent} from './events/events.component';
import {FitnessComponent} from './fitness/fitness.component';
import {LoansComponent} from './loans/loans.component';
import {ActsComponent} from './acts/acts.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {
     path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'common', pathMatch: 'full'},
      {path: 'common', component: CommonComponent, canActivate: [AuthGuard]},
      {path: 'dinners', component: DinnersComponent, canActivate: [AuthGuard]},
      {path: 'travels', component: TravelsComponent, canActivate: [AuthGuard]},
      {path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard]},
      {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
      {path: 'fitness', component: FitnessComponent, canActivate: [AuthGuard]},
      {path: 'loans', component: LoansComponent, canActivate: [AuthGuard]},
      {path: 'acts', component: ActsComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
