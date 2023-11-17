import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { RainbowDirective } from '../../directives/rainbow.directive';

@Component({
  selector: 'app-hosts',
  standalone: true,
  imports: [CommonModule, TitleComponent, RainbowDirective],
  templateUrl: './hosts.component.html',
  styleUrl: './hosts.component.css',
})
export default class HostsComponent {}
