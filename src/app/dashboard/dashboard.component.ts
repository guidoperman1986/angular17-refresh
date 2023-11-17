import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  public showContent = signal(false)
  
}
