import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-acts',
  templateUrl: './acts.component.html',
  styleUrls: ['./acts.component.scss']
})
export class ActsComponent implements OnDestroy, OnLoad {

  acts: Debt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getActs(year, month, businessUnits, departments).subscribe(acts => {
      this.acts = acts;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
