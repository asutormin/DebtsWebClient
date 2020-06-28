import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnDestroy, OnLoad {

  loans: Debt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getLoans(year, month, businessUnits, departments).subscribe(loans => {
      this.loans = loans;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
