import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRainbow]',
  standalone: true
})
export class RainbowDirective implements OnInit {
  possibleColors = [
    'darksalmon',
    'hotpink',
    'lightskyblue',
    'goldenrod',
    'peachpuff',
    'mediumspringgreen',
    'cornflowerblue',
    'blanchedalmond',
    'lightslategrey'
  ];

  @Input('appRainbow') placeholder!: string;
  @HostBinding('style.color') color!: string;
  @HostBinding('style.border-color') borderColor!: string;
  @HostBinding('style.padding') padding = '10px';
  @HostBinding('style.width') width = '300px';
  @HostBinding('attr.placeholder') placeHolder = '';


  @HostListener('keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);

    this.color = this.possibleColors[colorPick];
    this.borderColor = this.possibleColors[colorPick];
  }

  constructor() { 
  }
  
  ngOnInit(): void {
    this.placeHolder = this.placeholder      
  }

}
