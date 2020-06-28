export interface AuthUser {
  id: number;
  name: string;
  positionName: string;
  stateId: number;
  businessUnitId: number;
  departmentId: number;
  userLogin: string;
  ldapLogin: string;
  token: string;
}

export interface Debt {
  id: number;
  debtTypeId: number;
  businessUnitId: number;
  departmentId: number;
  debtorId: number;
  debtorName: string;
  year: number;
  month: number;
  cost: number;
  count: number;
  description: string;
  editorId: number;
}

export interface CommonDebt {
  businessUnitId: number;
  departmentId: number;
  debtorId: number;
  debtorName: string;
  year: number;
  month: number;
  dinners: number;
  travels: number;
  tickets: number;
  events: number;
  fitness: number;
  loans: number;
  acts: number;
  total: number;
}

export interface BusinessUnit {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  parentId: number;
  name: string;
}

export interface OnLoad {
  onLoad(year: number, month: number, businessUnits: number[], departments: number[]): void;
}

