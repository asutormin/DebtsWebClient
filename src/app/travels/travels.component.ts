import {Component, OnDestroy} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnDestroy, OnLoad {

  travels: Debt[] = [];
  private sub: Subscription;

  constructor(
    private debtService: DebtsService) {
  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.debtService.getTravels(year, month, businessUnits, departments).subscribe(travels => {
      this.travels = travels;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
