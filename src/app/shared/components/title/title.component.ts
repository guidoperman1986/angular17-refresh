import { Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  title = input.required<string>();
  withShadow = input(false, { transform: booleanAttribute });

}
