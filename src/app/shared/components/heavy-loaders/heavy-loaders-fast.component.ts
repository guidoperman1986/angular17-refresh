import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-heavy-loaders-fast',
    imports: [CommonModule],
    template: `
    <section [ngClass]="['w-full', cssClass]">
      <ng-content></ng-content>


    </section>
  `
})
export class HeavyLoadersFastComponent {
  @Input({required: true}) cssClass!: string;

  constructor() {
  }
}
