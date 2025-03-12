import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  template: `
    <header class="flex w-full items-center justify-between bg-white py-2 shadow-lg">
      <img (click)="home()" class="h-12 w-12" src="assets/favicon.png" alt="Classe-a-deux" />
      <span><ng-content></ng-content></span>
      <div class="flex flex-row">
        <img class="h-12 w-12 mr-1" src="assets/cahier.png" alt="Classe-a-deux" />
        <img class="h-12 w-12" src="assets/stylo.png" alt="Classe-a-deux" />
      </div>
    </header>
  `,
})
export class HeaderComponent {
  #router = inject(Router);
  home() {
    this.#router.navigate(['/']);
  }
}
