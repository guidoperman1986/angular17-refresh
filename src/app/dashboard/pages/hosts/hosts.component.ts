import { Component } from '@angular/core';

import { TitleComponent } from '@shared/title/title.component';
import { RainbowDirective } from '../../directives/rainbow.directive';

@Component({
    selector: 'app-hosts',
    imports: [TitleComponent, RainbowDirective],
    templateUrl: './hosts.component.html',
    styleUrl: './hosts.component.css'
})
export default class HostsComponent {}
