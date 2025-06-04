import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';

@Component({
    imports: [RouterModule, SideMenuComponent],
    templateUrl: './dashboard.component.html',
    styles: ``
})
export class DashboardComponent {
  public showContent = signal(false)
  
}
