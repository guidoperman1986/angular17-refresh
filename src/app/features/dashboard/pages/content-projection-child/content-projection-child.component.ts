
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { ContentProjectionGrandChildComponent } from '../content-projection-grand-child/content-projection-grand-child.component';

@Component({
    selector: 'app-content-projection-child',
    imports: [
    ContentProjectionGrandChildComponent
],
    template: `
    <app-content-projection-grand-child>
      <div class="card-layout-title">
        <ng-content select=".card-layout-title"></ng-content>
        <ng-content select=".img"></ng-content>
        <ng-content select=".text"></ng-content>
      </div>

    </app-content-projection-grand-child>
  `,
    styleUrl: './content-projection-child.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentProjectionChildComponent { 
  /* @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>; */

}
