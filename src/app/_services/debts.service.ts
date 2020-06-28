import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BusinessUnit, CommonDebt, Debt, Department} from '../_interfaces/interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DebtsService {
  constructor(private  http: HttpClient) {  }

  public getBusinessUnits(): Observable<BusinessUnit[]> {
    return this.http.get(`${environment.apiUrl}/businessUnits`)
      .pipe(
        map(response => response as BusinessUnit[]));
  }

  public getDepartments(): Observable<Department[]> {
    return this.http.get(`${environment.apiUrl}/departments`)
      .pipe(
        map(response => response as Department[]));
  }

  public getCommons(year: number, month: number, businessUnits: number[], departments: number[]): Observable<CommonDebt[]> {
    const bu = businessUnits.join('; ');
    const d = departments.join('; ');
    return this.http.get(`${environment.apiUrl}/debts/common/${year}/${month}/"${bu}"/"${d}"`)
      .pipe(
        map(response => (response as CommonDebt[])
          .sort((one, two) => (one.debtorName < two.debtorName ? -1 : 1))));
  }

  create(debt: Debt): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/debts/create`, debt)
      .pipe(
        map(response => response)
      );
  }

  update(debt: Debt): Observable<number> {
    return this.http.put<number>(`${environment.apiUrl}/debts/update`, debt)
      .pipe(
        map(response => response)
      );
  }

  public getDebts(debtTypeId: number, year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    const bu = businessUnits.join('; ');
    const d = departments.join('; ');
    return this.http.get(`${environment.apiUrl}/debts/${debtTypeId}/${year}/${month}/"${bu}"/"${d}"`)
      .pipe(
        map(response => (response as Debt[])
            .sort((one, two) => (one.debtorName < two.debtorName ? -1 : 1))));
  }

  public getDinners(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(2, year, month, businessUnits, departments);
  }

  public getTravels(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(3, year, month, businessUnits, departments);
  }

  public getTickets(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(4, year, month, businessUnits, departments);
  }

  public getEvents(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(5, year, month, businessUnits, departments);
  }

  getFitness(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(6, year, month, businessUnits, departments);
  }

  getLoans(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(7, year, month, businessUnits, departments);
  }

  getActs(year: number, month: number, businessUnits: number[], departments: number[]): Observable<Debt[]> {
    return this.getDebts(8, year, month, businessUnits, departments);
  }
}
