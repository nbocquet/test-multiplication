import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-container',
  standalone: true,
  imports: [],
  template: `
    <div class="w-40 h-12 top-14 -left-12 relative rotate-[-30deg] bg-white opacity-20"></div>
    <div class="relative flex flex-col w-full items-center justify-center bg-white p-5 rounded">
      <ng-content></ng-content>
    </div>
    <div class="flex flex-row-reverse">
      <div class="w-40 h-12 -top-8 left-8 relative rotate-[-30deg] bg-white opacity-20"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {}
