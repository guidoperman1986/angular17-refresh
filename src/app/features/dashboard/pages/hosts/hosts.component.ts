import { Component } from '@angular/core';

import { TitleComponent } from '@shared/index';
import { RainbowDirective } from '@shared/index';

@Component({
    selector: 'app-hosts',
    imports: [TitleComponent, RainbowDirective],
    templateUrl: './hosts.component.html',
    styleUrl: './hosts.component.css'
})
export default class HostsComponent {}
