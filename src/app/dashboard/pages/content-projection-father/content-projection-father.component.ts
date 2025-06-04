
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentProjectionChildComponent } from '../content-projection-child/content-projection-child.component';

@Component({
    selector: 'app-content-projection-father',
    imports: [
    ContentProjectionChildComponent
],
    template: `
    <app-content-projection-child>
      <div class="card-layout-title">
        <h1>Content Projection</h1>
      </div>

      <img (load)="onImageLoaded()" class="img" src="https://picsum.photos/200/300" alt="">

      <div class="text">Text</div>
    </app-content-projection-child>


  
  `,
    styleUrl: './content-projection-father.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContentProjectionFatherComponent {
  isImgLoaded!: boolean;

  onImageLoaded() {
    this.isImgLoaded = true
  }
}
