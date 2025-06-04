import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

@Component({
    imports: [CommonModule, TitleComponent],
    template: `
    <app-title title="View Transition 1"></app-title>

    <section class="flex justify-start">
      <img
        srcset="https://picsum.photos/200/300"
        alt="Picsum0"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div
        class="bg-blue-500 w-56 h-56"
        style="view-transition-name: hero2"
      ></div>
    </section>
  `
})
export default class ViewTransitionComponent {}
