import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-content-projection-grand-child',
    imports: [
        CommonModule,
    ],
    template: `  
    <ng-content select=".card-layout-title"></ng-content>
    <ng-content select="img"></ng-content>
    <ng-content select=".text"></ng-content>  
  `,
    styleUrl: './content-projection-grand-child.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentProjectionGrandChildComponent { }
