import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex items-center m-1 pt-1 border border-[#6ba0a5] rounded"
      [class.check]="check">
      <button (click)="checked()">
        <ng-content></ng-content>
      </button>
    </div>
  `,
  styles: [
    `
      .check {
        @apply bg-[#6ba0a5] text-white ;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() check = false;
  @Output() action = new EventEmitter<boolean>();

  checked() {
    this.action.emit(!this.check);
  }
}
