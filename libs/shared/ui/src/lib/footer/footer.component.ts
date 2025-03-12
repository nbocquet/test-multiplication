import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-[#587c7f] h-0.5 w-[300px]"></div>
    <p class="mt-5">
      Outil créé par
      <a href="https://alan.choufa.fr/" target="_blank">Alan Choufa</a>
      pour
      <a href="https://recap.classeadeux.fr" target="_blank">classeadeux.fr</a>
      - Police :
      <a href="https://www.jeanboyault.fr/belle-allure/" target="_blank">jeanboyault.fr</a>
      - Code source : 
      <a href="https://forge.apps.education.fr/classeadeux/test-multiplication" target="_blank">LaForgeEdu</a>
    </p>
  `,
  styles: [
    `
      :host {
        background-color: #6ba0a5;
        padding: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
