import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';

@Component({
    imports: [RouterModule, SideMenuComponent],
    templateUrl: './dashboard.component.html',
    styles: ``
})
export class DashboardComponent {
  
  
}
