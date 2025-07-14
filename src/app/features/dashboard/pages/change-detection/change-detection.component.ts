import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/index';

@Component({
    imports: [CommonModule, TitleComponent],
    template: `
    <app-title [title]="currentFramework()"></app-title>

    <pre>{{ frameworkAsSignal() | json }}</pre>

    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(()=> `Change detection - ${this.frameworkAsSignal().name}` )

  public frameworkAsSignal = signal({
    name: 'Angular',
    release: 2016,
  });

  public frameworkAsProperty = {
    name: 'Angular',
    release: 2016,
  };

  constructor() {
    setTimeout(()=>{
      //this.frameworkAsProperty.name = 'React'
      this.frameworkAsSignal.update(value => ({
        ...value,
        name: 'React'
      }))


      console.log('Hecho')
    },3000)
  }
}
