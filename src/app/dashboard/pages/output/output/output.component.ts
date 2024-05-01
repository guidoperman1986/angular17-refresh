import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    output
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-output-child',
  standalone: true,
  template: `
    <div class="mt-3">
      <h2>This is a child component</h2>

      <input
        class="mt-2 p-2 rounded-md"
        placeholder="Write Something..."
        #text
        (keyup.enter)="newOutputWithSingals.emit(text.value)"
      />
    </div>

    <div class="mt-4 w-48 bg-slate-200">
      <h2>Click here</h2>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputChildComponent {
  click$ = fromEvent<MouseEvent>(document, 'click');
  onClick = outputFromObservable(this.click$);

  newOutputWithSingals = output<string>();
}

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule, OutputChildComponent],
  template: `
    <div>
      <h1 class="text-2x">Output with signals</h1>
    </div>
    <hr />
    <app-output-child
      (newOutputWithSingals)="showText($event)"
      (onClick)="showCount()"
    ></app-output-child>

    <div>Click count: {{ clickCount }}</div>
  `,
  styleUrl: './output.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OutputComponent {
  clickCount = 0;

  showText(text: string) {
    alert(text);
  }

  showCount() {
    this.clickCount++;
  }
}
