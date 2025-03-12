import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent, MainComponent } from '@classe-a-deux/shared-ui';

@Component({
  selector: 'multiplication-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MainComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-header>,,Test ,,tables ,,de ,,multiplication</ui-header>
    <ui-main><router-outlet /></ui-main>
    <ui-footer />
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  title = 'multiplication';
}
