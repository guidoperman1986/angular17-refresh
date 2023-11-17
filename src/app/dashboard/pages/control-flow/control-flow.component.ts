import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../../shared/title/title.component";

type Grade = 'A' | 'B' | 'F';

@Component({
    standalone: true,
    templateUrl: './control-flow.component.html',
    styles: ``,
    imports: [CommonModule, TitleComponent]
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
