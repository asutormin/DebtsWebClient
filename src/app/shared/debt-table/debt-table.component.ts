import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Debt} from '../../_interfaces/interfaces';
import {DebtsService} from '../../_services/debts.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-debt-table',
  templateUrl: './debt-table.component.html',
  styleUrls: ['./debt-table.component.scss']
})
export class DebtTableComponent {

  @Input() debts: Debt[];
  @Output() debtChanged: EventEmitter<Debt> = new EventEmitter<Debt>();

  constructor(
    private authService: AuthService,
    private debtsService: DebtsService) {  }

  onKeyDown($event, template: string) {
    if ($event.key === 'Backspace') {
      return;
    }
    if (template === 'input-description-') {
      return;
    }
    if (Number.isNaN(Number($event.key))) {
      $event.preventDefault();
    }
  }

  onKeyEscape($event) {
    $event.target.blur();
  }

  onKeyEnter($event, template: string, currentIndex: number, debt: Debt) {
    $event.preventDefault();
    this.update(debt, template, $event.target.value);
    $event.target.value = '';
    this.moveVertical(template, currentIndex, 1);
  }

  onKeyArrowUp($event, template: string, currentIndex: number) {
    $event.preventDefault();
    $event.target.value = '';
    this.moveVertical(template, currentIndex, -1);
  }

  onKeyUpArrowDown($event, template: string, currentIndex: number) {
    $event.preventDefault();
    $event.target.value = '';
    this.moveVertical(template, currentIndex, 1);
  }

  onKeyArrowLeft($event, template: string, currentIndex: number) {
    $event.preventDefault();
    $event.target.value = '';
    this.moveHorizontal(template, currentIndex, -1);
  }

  onKeyArrowRight($event, template: string, currentIndex: number) {
    $event.preventDefault();
    $event.target.value = '';
    this.moveHorizontal(template, currentIndex, 1);
  }

  private moveVertical(template: string, currentIndex: number, delta: number) {
    const nextIndex = currentIndex + delta;
    this.focusElement(template, nextIndex);
  }

  private moveHorizontal(template: string, currentIndex: number, delta: number) {
    if (template === 'input-cost-') {
      switch (delta) {
        case 1: this.focusElement('input-count-', currentIndex);
                break;
        case -1: this.focusElement('input-description-', currentIndex);
                 break;
      }
    }
    if (template === 'input-count-') {
      switch (delta) {
        case 1: this.focusElement('input-description-', currentIndex);
                break;
        case -1: this.focusElement('input-cost-', currentIndex);
                 break;
      }
    }
    if (template === 'input-description-') {
      switch (delta) {
        case 1: this.focusElement('input-cost-', currentIndex);
                break;
        case -1: this.focusElement('input-count-', currentIndex);
                 break;
      }
    }
  }

  private focusElement(template: string, index: number) {
    const element = document.getElementById(template + index);
    if (element !== null) {
      element.focus();
    }
  }

  private update(debt: Debt, template: string, value: any) {
    if (template === 'input-count-') {
      debt.count = Number(value);
    } else if (template === 'input-cost-') {
      debt.cost = Number(value);
    } else if (template === 'input-description-') {
      debt.description = String(value);
    } else {
      return;
    }
    this.save(debt);
    this.debtChanged.emit(debt);
  }

  private save(debt: Debt) {
    if (this.authService.currentUserValue != null) {
      debt.editorId = this.authService.currentUserValue.id;
    }

    if (debt.id === 0) {
      this.debtsService.create(debt).subscribe(
        id => { debt.id = id; },
        error => { console.log(error); }
      );
    } else {
      this.debtsService.update(debt).subscribe(
        id => {},
        error => { console.log(error); }
      );
    }
  }

  getTotalCount(): number {
    let count = 0;
    if (this.debts !== null) {
      for (const debt of this.debts) {
        count += debt.count;
      }
    }
    return count;
  }

  getTotalSum(): number {
    let sum = 0;
    if (this.debts !== null) {
      for (const debt of this.debts) {
        sum += debt.cost * debt.count;
      }
    }
    return sum;
  }


}
