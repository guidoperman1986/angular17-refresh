import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-title',
    imports: [CommonModule],
    templateUrl: './title.component.html',
    styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input({required: true}) title!: string;
  @Input({transform: booleanAttribute}) withShadow: boolean = false;

}
