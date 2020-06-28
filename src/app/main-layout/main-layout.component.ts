import {Component, OnDestroy, OnInit} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {AuthUser, OnLoad} from '../_interfaces/interfaces';
import {DebtsService} from '../_services/debts.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

const MONTHS = [
  {id: 0, name: 'Январь'},
  {id: 1, name: 'Февраль'},
  {id: 2, name: 'Март'},
  {id: 3, name: 'Апрель'},
  {id: 4, name: 'Май'},
  {id: 5, name: 'Июнь'},
  {id: 6, name: 'Июль'},
  {id: 7, name: 'Август'},
  {id: 8, name: 'Сентябрь'},
  {id: 9, name: 'Октябрь'},
  {id: 10, name: 'Ноябрь'},
  {id: 11, name: 'Декабрь'}
];

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  currentUser: AuthUser;

  activeComponent: OnLoad;

  bSub: Subscription;
  dSub: Subscription;

  years = [];
  selectedYear: number;

  months = MONTHS;
  selectedMonth: number;

  businessUnits = [];
  selectedBusinessUnits = [];

  departments = [];
  selectedDepartments = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private debtService: DebtsService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.bSub = this.debtService.getBusinessUnits().subscribe(debts => {
      this.businessUnits = debts;
    });

    this.dSub = this.debtService.getDepartments().subscribe(debts => {
      this.departments = debts;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Сбросить',
      itemsShowLimit: 2,
      allowSearchFilter: false,
      searchPlaceholderText: 'Найти',
      noDataAvailablePlaceholderText: 'Загрузка..'
    };

    this.fillYears();

    const date = new Date();
    date.setDate(0);

    this.selectedMonth = date.getMonth();
    this.selectedYear = date.getFullYear();
  }

  fillYears(): void {
    const lastYear = (new Date()).getFullYear() + 1;

    for (let y = 2019; y <= lastYear; y++) {
      this.years.push(y);
    }

    this.years.sort((one, two) => (one > two ? -1 : 1));
  }

  onActivate($event: OnLoad) {
    this.activeComponent = $event;
    this.load();
  }

  onParameterChange(): void {
    if (!this.canLoad()) {
      return;
    }

    this.load();
  }

  canLoad(): boolean {
    if (this.selectedYear > 0 && this.selectedMonth >= 0) {
      return true;
    }

    return false;
  }

  load(): void {
    this.activeComponent.onLoad(
      this.selectedYear,
      this.selectedMonth + 1,
      this.selectedBusinessUnits.map(({ id }) => id),
      this.selectedDepartments.map(({ id }) => id));
  }

  ngOnDestroy(): void {
    if (this.bSub) {
      this.bSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
