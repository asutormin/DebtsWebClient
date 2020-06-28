import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnDestroy, OnLoad {

  events: Debt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getEvents(year, month, businessUnits, departments).subscribe(events => {
      this.events = events;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
