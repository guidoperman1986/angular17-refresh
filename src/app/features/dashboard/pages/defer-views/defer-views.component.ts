import { Component } from '@angular/core';

import { HeavyLoadersSlowComponent, TitleComponent } from '@shared/index';

@Component({
    imports: [HeavyLoadersSlowComponent, TitleComponent],
    templateUrl: './defer-views.component.html',
    styles: ``
})
export default class DeferViewsComponent {

}
