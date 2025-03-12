import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import {
  Multiplication,
  nomChanges,
  selectNom,
  selectTables,
} from '@classe-a-deux/test';
import { Store } from '@ngrx/store';
import { jsPDF } from 'jspdf';
import { combineLatest, take } from 'rxjs';

@Component({
  selector: 'classe-a-deux-result',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgClass,
    NgFor,
    ContainerComponent,
    ButtonComponent,
    InputComponent,
  ],
  template: `
    @if(tables$ | async; as tables) {
    <ui-container>
      <div class="flex items-center mb-5">
        <ui-input (valueChanges)="nomChanges($event)">Nom - Prénom</ui-input>
        <ui-button (action)="save()">
          <span class="material-symbols-outlined">download</span>
        </ui-button>
      </div>
      <div class="w-full">
        <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t2(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t3(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t4(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t5(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
        </div>
        <div class="flex flex-row justify-between w-full mt-5">
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t6(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t7(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t8(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
          <div class="flex flex-col">
            <ng-container *ngFor="let table of tables; let i = index">
              <span
                *ngIf="t9(i)"
                [ngClass]="
                  correct(table) ? 'text-green-700' : 'text-orange-900 line-through'
                ">
                {{ table.question }} {{ table.answer }}
              </span>
            </ng-container>
          </div>
        </div>
      </div>
    </ui-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  #store = inject(Store);
  doc = new jsPDF('p', 'pt', 'a4');
  tables$ = this.#store.select(selectTables);
  nom$ = this.#store.select(selectNom);

  nomChanges(nom: string) {
    this.#store.dispatch(nomChanges({ nom }));
  }
  save() {
    combineLatest([this.tables$, this.nom$])
      .pipe(take(1))
      .subscribe(([tables, nom]) => {
        this.doc.setTextColor('#000000');
        this.doc.text(nom, 250, 25);

        tables.forEach((table, i) => {
          if (this.correct(table)) {
            this.doc.setTextColor('#038f13');
            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(9);
          } else {          
            this.doc.setTextColor('#9c0606');      
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(10);
          }
          if (i <= 9) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              50,
              25 * (i + 2)
            );
          }
          if (i > 9 && i <= 19) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              50,
              25 * (i + 3)
            );
          }
          if (i > 19 && i <= 29) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              50,
              25 * (i + 4)
            );
          }
          if (i > 29 && i <= 39) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              250,
              25 * (i - 28)
            );
          }

          if (i > 39 && i <= 49) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              250,
              25 * (i - 27)
            );
          }

          if (i > 49 && i <= 59) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              250,
              25 * (i - 26)
            );
          }

          if (i > 59 && i <= 69) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              450,
              25 * (i - 58)
            );
          }
          if (i > 69) {
            this.doc.text(`${table.question} ${table.answer} ${this.correct(table) ? ' OK ' : '| Non, '+table.question+table.result}`,
              450,
              25 * (i - 57)
            );
          }
        });
        this.doc.save(`${nom}.pdf`);
      });
  }

  correct(multiplication: Multiplication) {
    return multiplication.result === multiplication.answer;
  }

  tenth(i: number) {
    return (i + 1) % 10 === 0;
  }

  t2(i: number) {
    return i + 1 <= 10;
  }

  t3(i: number) {
    return i + 1 > 10 && i + 1 <= 20;
  }
  t4(i: number) {
    return i + 1 > 20 && i + 1 <= 30;
  }

  t5(i: number) {
    return i + 1 > 30 && i + 1 <= 40;
  }
  t6(i: number) {
    return i + 1 > 40 && i + 1 <= 50;
  }

  t7(i: number) {
    return i + 1 > 50 && i + 1 <= 60;
  }
  t8(i: number) {
    return i + 1 > 60 && i + 1 <= 70;
  }

  t9(i: number) {
    return i + 1 > 70;
  }
}
