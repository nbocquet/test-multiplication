import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  debounceTime,
  exhaustMap,
  filter,
  interval,
  map,
  repeat,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Multiplication, shuffle } from './test.constante';
import { selectQuestionCount, selectTables, selectTime, tableChanges } from './test.store';

export interface TableMultiplicationState {
  tables: Multiplication[];
  answer: string;
  count: number;
  indicateur: Indicateur;
  progressCounter: number;
  progressTest: number;
  disabledValidate: boolean;
}

export interface Indicateur {
  icon: 'task_alt' | 'error' | '';
  color: 'text-green-700' | 'text-orange-900' | 'text-black';
}

export const indicateurValid: Indicateur = {
  icon: 'task_alt',
  color: 'text-green-700',
};
export const indicateurError: Indicateur = {
  icon: 'error',
  color: 'text-orange-900',
};
export const indicateurWaiting: Indicateur = {
  icon: '',
  color: 'text-black',
};

export const initialTableMultiplicationState: TableMultiplicationState = {
  tables: [],
  answer: '',
  count: 0,
  indicateur: indicateurWaiting,
  progressCounter: 100,
  progressTest: 0,
  disabledValidate: false,
};

@Injectable()
export class TableMultiplicationComponentStore extends ComponentStore<TableMultiplicationState> {
  #router = inject(Router);
  #store = inject(Store);
  readonly tables$ = this.select(state => state.tables);
  readonly answer$ = this.select(state => state.answer);
  readonly count$ = this.select(state => state.count);
  readonly indicateur$ = this.select(state => state.indicateur);
  readonly progressCounter$ = this.select(state => state.progressCounter);
  readonly progressTest$ = this.select(state => state.progressTest);
  readonly disabledValidate$ = this.select(state => state.disabledValidate);

  constructor() {
    super(initialTableMultiplicationState);
    this.initTable();
    this.progress();
    this.navigate();
  }

  readonly updateIndicateur = this.updater((state, indicateur: Indicateur) => ({
    ...state,
    indicateur,
  }));

  readonly initTable = this.effect<void>(source$ =>
    source$.pipe(
      exhaustMap(() =>
        combineLatest([
          this.#store.select(selectTables),
          this.#store.select(selectQuestionCount),
        ]).pipe(
          map(([tables, questionCount]) => {
            const shuffled = shuffle([...tables]);
            return questionCount > 0 ? shuffled.slice(0, questionCount) : shuffled;
          }),
          tap(tables => this.patchState(() => ({ tables })))
        )
      ),
      take(1)
    )
  );

  readonly validate = this.effect<void>(source$ =>
    source$.pipe(
      withLatestFrom(this.tables$, this.answer$, this.count$),
      tap(() => this.patchState({ disabledValidate: true })),
      tap(([_, tables, answer, count]) =>
        this.#store.dispatch(
          tableChanges({ table: { ...tables[count], answer: +answer } })
        )
      ),
      tap(([_, tables, answer, count]) =>
        this.updateIndicateur(
          tables[count]?.result === +answer ? indicateurValid : indicateurError
        )
      ),
      debounceTime(2000),
      tap(([_, tables]) =>
        this.patchState(({ progressTest }) => ({
          progressTest: progressTest + 100 / tables.length,
        }))
      ),
      tap(() => this.patchState(({ count }) => ({ count: count + 1 }))),
      tap(() => this.patchState({ answer: '' })),
      tap(() => this.updateIndicateur(indicateurWaiting)),
      tap(() => this.patchState({ progressCounter: 100 })),
      tap(() => this.patchState({ disabledValidate: false })),
      tap(() => this.progress()),
      take(1),
      repeat()
    )
  );

  readonly progress = this.effect<void>(source$ =>
    source$.pipe(
      switchMap(() =>
        combineLatest([this.#store.select(selectTime), interval(25)]).pipe(
          tap(([time]) =>
            this.patchState(({ progressCounter }) => ({
              progressCounter: progressCounter - 0.5 * (5 / time),
            }))
          ),
          filter(([time, interval]) => interval === 200 * (time / 5)),
          tap(() => this.validate())
        )
      ),
      take(1),
      repeat()
    )
  );

  readonly navigate = this.effect<void>(source$ =>
    source$.pipe(
      switchMap(() =>
        combineLatest([this.tables$, this.count$]).pipe(
          tap(([tables, count]) => {
            if (tables.length === 0) return;
            if (tables.length === count) {
              this.#router.navigate(['result']);
            }
          })
        )
      )
    )
  );
}
