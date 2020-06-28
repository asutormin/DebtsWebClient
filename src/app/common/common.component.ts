import {Component, OnDestroy} from '@angular/core';
import {CommonDebt, Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnDestroy, OnLoad {

  commons: CommonDebt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getCommons(year, month, businessUnits, departments).subscribe(commons => {
      this.commons = commons;
    });
  }

  getTotalDinners(): number {
     let total = 0;
     if (this.commons !== null) {
       for (const common of this.commons) {
         total += common.dinners;
       }
     }
     return total;
  }

  getTotalTravels(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.travels;
      }
    }
    return total;
  }

  getTotalTickets(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.tickets;
      }
    }
    return total;
  }

  getTotalEvents(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.events;
      }
    }
    return total;
  }

  getTotalFitness(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.fitness;
      }
    }
    return total;
  }

  getTotalLoans(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.loans;
      }
    }
    return total;
  }

  getTotalActs(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.acts;
      }
    }
    return total;
  }

  getTotalTotal(): number {
    let total = 0;
    if (this.commons !== null) {
      for (const common of this.commons) {
        total += common.total;
      }
    }
    return total;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
