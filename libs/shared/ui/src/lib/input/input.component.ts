import { ChangeDetectionStrategy, Component, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="relative m-3">
      <label class="absolute ml-2 -translate-y-3 bg-white scale-75 px-2">
        <ng-content></ng-content>
      </label>
      <input #inputElement [formControl]="value" type="text"
        [attr.inputmode]="numbersOnly ? 'numeric' : null"
        (keydown)="onKeyDown($event)"
        class="border border-black rounded-lg w-full p-2 font-sans"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements AfterViewInit {
  @Input() set reset(value: string) {
    this.value.patchValue(value);
    if (this.autofocus) {
      this.inputElement?.nativeElement.focus();
    }
  }
  @Input() autofocus = false;
  @Input() numbersOnly = false;

  value = new FormControl('', { nonNullable: true });
  @Output() valueChanges = this.value.valueChanges;

  @ViewChild('inputElement', { static: false }) inputElement: ElementRef | undefined;

  ngAfterViewInit() {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.numbersOnly) return;
    const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (allowed.includes(event.key)) return;
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) return;
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }
}
