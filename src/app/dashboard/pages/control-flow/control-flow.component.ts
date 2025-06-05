import { Component, signal } from '@angular/core';

import { TitleComponent } from "../../../shared/title/title.component";
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

type Grade = 'A' | 'B' | 'F';

@Component({
  templateUrl: './control-flow.component.html',
  styles: ``,
  imports: [TitleComponent, TooltipDirective]
})
export default class ControlFlowComponent {
  showContent = signal(false);
  public grade = signal<Grade>('A');
  public framworks = signal(['Angular', 'Vue', 'Svelte', 'Qwik', 'React']);
  public framworks2 = signal([]);

  toggleContent() {
    this.showContent.set(!this.showContent());
  }
}
