
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CounterStore } from '../../store/singal-store';
import { TooltipDirective } from '@shared/index';


@Component({
    selector: 'app-signal-store',
    imports: [TooltipDirective],
    template: `
    <h1>Counter (signalStore)</h1>
    <p>Count {{store.count()}}</p>

    <button appTooltip="Increment" class="bg-blue-500 mr-4 p-2 rounded text-white" (click)="store.increment()">+1</button>
    <button appTooltip="Decrement" class="bg-blue-500 mr-4 p-2 rounded text-white" (click)="store.decrement()">-1</button>
    <button appTooltip="Reset" class="bg-blue-500 mr-4 p-2 rounded text-white" (click)="store.reset()">Reset</button>
  
  `,
    styleUrl: './signalStore.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignalStoreComponent implements OnInit { 
  store = inject(CounterStore);

  ngOnInit(): void {
  }


}
