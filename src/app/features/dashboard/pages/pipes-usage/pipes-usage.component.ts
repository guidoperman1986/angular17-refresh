import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from '@shared/index';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { InitialPipePipe } from "../../../../shared/pipes/initial-pipe.pipe";
import { HighlightTextPipe } from "../../../../shared/pipes/highlight-text.pipe";

@Component({
  selector: 'app-pipes-usage',
  imports: [TitleComponent, FormsModule, TimeAgoPipe, InitialPipePipe, HighlightTextPipe],
  templateUrl: './pipes-usage.component.html',
  styles: ``
})
export default class PipesUsageComponent {
  date: Date | null = null;
  name: string | null = null;

  text: string = '';
  searchTerm: string = '';;

}

