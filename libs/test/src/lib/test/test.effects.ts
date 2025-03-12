import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, tap } from 'rxjs';
import {
  addSelectedTable,
  addTable,
  clearTable,
  removeSelectedTable,
  selectSelectedTable,
  updateTime,
} from './test.store';

export const syncTimeLocalStorageEffect = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(updateTime),
      tap(({ time }) => localStorage.setItem('time', `${time}`))
    );
  },
  { functional: true, dispatch: false }
);
export const syncSelectedTableLocalStorageEffect = createEffect(
  () => {
    const store = inject(Store);
    return inject(Actions).pipe(
      ofType(addSelectedTable, removeSelectedTable),
      exhaustMap(() => store.select(selectSelectedTable)),
      tap(selectedTable =>
        localStorage.setItem('selectedTable', `[${selectedTable}]`)
      )
    );
  },
  { functional: true, dispatch: false }
);

export const updateTableEffect = createEffect(
  () => {
    const store = inject(Store);
    return inject(Actions).pipe(
      ofType(addSelectedTable, removeSelectedTable),
      exhaustMap(() => store.select(selectSelectedTable)),
      tap(() => store.dispatch(clearTable())),
      tap(selectTable =>
        selectTable.forEach(table => store.dispatch(addTable({ table })))
      )
    );
  },
  { functional: true, dispatch: false }
);
