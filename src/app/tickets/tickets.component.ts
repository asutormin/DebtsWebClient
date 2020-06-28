import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnDestroy, OnLoad {

  tickets: Debt[] = [];
  private sub: Subscription;

  constructor(
    private debtService: DebtsService) {
  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.debtService.getTickets(year, month, businessUnits, departments).subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
