import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  appTooltip = input<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {    
    const tooltip = this.renderer.createElement('div');
    this.renderer.setStyle(tooltip, 'display', 'none');
    
    this.elementRef.nativeElement.addEventListener('mouseover', () => {
      this.renderer.setStyle(tooltip, 'display', 'block');
      this.renderer.setStyle(tooltip, 'position', 'absolute');      
      this.renderer.setStyle(tooltip, 'background', 'black');      
      this.renderer.setStyle(tooltip, 'padding', '10px');
      this.renderer.setStyle(tooltip, 'border-radius', '5px');
      this.renderer.setStyle(tooltip, 'color', 'white');
      this.renderer.setStyle(tooltip, 'top', `${this.elementRef.nativeElement.offsetTop - 50}px`);
      this.renderer.setStyle(tooltip, 'left', `${this.elementRef.nativeElement.offsetLeft - 5}px`);
      this.renderer.setStyle(tooltip, 'z-index', '1000');
    });
    
    this.elementRef.nativeElement.addEventListener('mouseout', () => {
      this.renderer.setStyle(tooltip, 'display', 'none');
    });
    
    this.renderer.appendChild(tooltip, this.renderer.createText(this.appTooltip() || ''));
    this.renderer.addClass(tooltip, 'tooltip');
    this.renderer.appendChild(this.elementRef.nativeElement, tooltip);
  }

}
