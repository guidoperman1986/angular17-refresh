import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));

  constructor() {
    console.log(this.menuItems)
    /* const dashboardRoutes = routes
      .map((route) => route.children ?? [])
      .flat()
      .filter((route) => route && route.path)
      .filter((route) => route.path?.includes(':')); */
  }
}
