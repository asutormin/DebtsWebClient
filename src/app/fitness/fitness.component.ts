import {Component, OnDestroy, OnInit} from '@angular/core';
import {Debt, OnLoad} from '../_interfaces/interfaces';
import {Subscription} from 'rxjs';
import {DebtsService} from '../_services/debts.service';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.scss']
})
export class FitnessComponent implements OnDestroy, OnLoad {

  fitness: Debt[] = [];
  private sub: Subscription;

  constructor(private debtsService: DebtsService) {  }

  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.debtsService.getFitness(year, month, businessUnits, departments).subscribe(fitness => {
      this.fitness = fitness;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
