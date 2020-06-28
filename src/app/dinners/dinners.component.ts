import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {DebtsService} from '../_services/debts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dinners',
  templateUrl: './dinners.component.html',
  styleUrls: ['./dinners.component.scss']
})
export class DinnersComponent implements OnDestroy, OnLoad {

  dinners: Debt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getDinners(year, month, businessUnits, departments).subscribe(dinners => {
      this.dinners = dinners;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
