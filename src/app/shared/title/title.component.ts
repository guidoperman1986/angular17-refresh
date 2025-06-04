import { Component, Input, booleanAttribute } from '@angular/core';


@Component({
    selector: 'app-title',
    imports: [],
    templateUrl: './title.component.html',
    styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input({required: true}) title!: string;
  @Input({transform: booleanAttribute}) withShadow: boolean = false;

}
