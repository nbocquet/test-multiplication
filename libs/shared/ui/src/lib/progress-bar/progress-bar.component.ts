import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div [class]="getColor()" [style]="{ width: progress + '%' }"></div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() progress = 100;
  @Input() color!: boolean;

  getColor() {
    return `${this.color ? 'bg-blue-700' : 'bg-green-700'} h-2.5 rounded-full`;
  }
}
