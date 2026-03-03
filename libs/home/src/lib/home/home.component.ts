import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonComponent,
  CheckboxComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import {
  addSelectedTable,
  removeSelectedTable,
  selectQuestionCount,
  selectSelectedTable,
  selectTime,
  updateQuestionCount,
  updateTime,
} from '@classe-a-deux/test';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'classe-a-deux-home',
  standalone: true,
  imports: [
    AsyncPipe,
    ContainerComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  ],
  template: `
    <ui-container>
      <h2 class="w-full font-black ml-5">⚙️ <u>Paramètres</u></h2>
      <div class="flex flex-start items-center w-full m-5">
        <span class="m-3">Temps (s)</span>
        <ui-input
          [reset]="(time$ | async)!"
          (valueChanges)="updateTime($event)"></ui-input>
      </div>
      <div class="flex flex-start items-center w-full m-5">
        <span class="m-3">Nb de calculs</span>
        <ui-input
          [reset]="(questionCount$ | async)!"
          (valueChanges)="updateQuestionCount($event)">Nb de calculs (0 = tous)</ui-input>
      </div>
      <div class="flex flex-wrap justify-between w-full ">
        <span class="flex items-center ml-3">Tables</span>
        @if(selectedTable$ | async; as select) { @for (selectedTable of
        [2,3,4,5,6,7,8,9]; track $index) {
        <ui-checkbox
          [check]="select.includes(selectedTable)"
          (action)="checked($event, selectedTable)">&nbsp;× {{ selectedTable }}&nbsp;
        </ui-checkbox>
        }}
      </div>
      <p>&nbsp;</p>
      <h2 class="w-full font-black ml-5">👉 <u>Prêt·e ?</u></h2>
      <p>&nbsp;</p>
      <p>Nous allons tester ta connaissance des tables de multiplication. Tu auras {{ time$ | async }} secondes par calcul. À la fin, télécharge ou imprime ton tableau récapitulatif.</p>
      <p>&nbsp;</p>
      <ui-button (action)="navigate()">Commencer le test</ui-button>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  #router = inject(Router);
  #store = inject(Store);
  time$ = this.#store.select(selectTime).pipe(map(time => `${time}`));
  selectedTable$ = this.#store.select(selectSelectedTable);
  questionCount$ = this.#store.select(selectQuestionCount).pipe(map(qc => `${qc}`));

  ngOnInit(): void {
    const savedTime = localStorage.getItem('time');
    this.#store.dispatch(updateTime({ time: savedTime ? +savedTime : 5 }));
    const savedQC = localStorage.getItem('questionCount');
    if (savedQC !== null) {
      this.#store.dispatch(updateQuestionCount({ questionCount: Math.max(0, Math.min(200, +savedQC || 0)) }));
    }
    const defaultTables = [2, 3, 4, 5, 6, 7, 8, 9];
    let savedTables: number[] = defaultTables;
    try {
      const raw = localStorage.getItem('selectedTable');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          savedTables = parsed;
        }
      }
    } catch {
      savedTables = defaultTables;
    }
    savedTables.forEach(selectedTable =>
      this.#store.dispatch(addSelectedTable({ selectedTable }))
    );
  }

  navigate() {
    this.#router.navigate(['/test']);
  }

  updateTime(time: string) {
    const parsed = Math.max(1, Math.min(60, +time || 5));
    this.#store.dispatch(updateTime({ time: parsed }));
  }

  updateQuestionCount(value: string) {
    const parsed = Math.floor(+value);
    const questionCount = isNaN(parsed) || parsed < 0 ? 0 : Math.min(200, parsed);
    this.#store.dispatch(updateQuestionCount({ questionCount }));
  }

  checked(check: boolean, selectedTable: number) {
    if (check) {
      this.#store.dispatch(addSelectedTable({ selectedTable }));
    } else {
      this.#store.dispatch(removeSelectedTable({ selectedTable }));
    }
  }
}
