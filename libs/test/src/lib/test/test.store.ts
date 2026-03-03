import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
  props,
} from '@ngrx/store';
import { LIST_TABLE, Multiplication } from './test.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
  selectedTable: number[];
  nom: string;
  time: number;
  questionCount: number;
}

export const init: TableMultiplicationState = {
  tables: [],
  selectedTable: [],
  nom: '',
  time: 5,
  questionCount: 0,
};

const testActions = createActionGroup({
  source: 'Test Action',
  events: {
    'Add Table': props<{ table: number }>(),
    'Clear Table': emptyProps(),
    'Add Selected Table': props<{ selectedTable: number }>(),
    'Remove Selected Table': props<{ selectedTable: number }>(),
    'Table Changes': props<{ table: Multiplication }>(),
    'Nom changes': props<{ nom: string }>(),
    'Update time': props<{ time: number }>(),
    'Update Question Count': props<{ questionCount: number }>(),
  },
});

export const {
  addTable,
  clearTable,
  addSelectedTable,
  removeSelectedTable,
  tableChanges,
  nomChanges,
  updateTime,
  updateQuestionCount,
} = testActions;

export const testFeature = createFeature({
  name: 'Test Feature',
  reducer: createReducer(
    init,
    on(addTable, (state, { table }) => ({
      ...state,
      tables: [...state.tables, ...LIST_TABLE[table - 1]],
    })),
    on(clearTable, state => ({
      ...state,
      tables: [],
    })),
    on(addSelectedTable, (state, { selectedTable }) => ({
      ...state,
      selectedTable: !state.selectedTable.includes(selectedTable)
        ? [...state.selectedTable, selectedTable]
        : [...state.selectedTable],
    })),
    on(removeSelectedTable, (state, { selectedTable }) => ({
      ...state,
      selectedTable: state.selectedTable.filter(v => v !== selectedTable),
    })),
    on(tableChanges, (state, { table }) => ({
      ...state,
      tables: state.tables.map(t =>
        t.id === table.id ? { ...t, answer: table.answer } : t
      ),
    })),
    on(nomChanges, (state, { nom }) => ({ ...state, nom })),
    on(updateTime, (state, { time }) => ({
      ...state,
      time,
    })),
    on(updateQuestionCount, (state, { questionCount }) => ({
      ...state,
      questionCount,
    }))
  ),
});

export const {
  selectTables,
  selectSelectedTable,
  selectNom,
  selectTime,
  selectQuestionCount,
} = testFeature;
