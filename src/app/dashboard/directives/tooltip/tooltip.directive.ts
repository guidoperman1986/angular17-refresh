import { Directive, ElementRef, effect, inject, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  appTooltip = input<string>();

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private tooltip!: HTMLElement;
  private tooltipTextNode!: Text;

  constructor() {
    // React to tooltip text changes
    effect(() => {
      if (this.tooltipTextNode) {
        this.tooltipTextNode.textContent = this.appTooltip() || '';
      }
    });
  }

  ngOnInit(): void {    
    this.tooltip = this.renderer.createElement('div');
    this.renderer.setStyle(this.tooltip, 'display', 'none');
    
    this.elementRef.nativeElement.addEventListener('mouseover', () => {
      this.renderer.setStyle(this.tooltip, 'display', 'block');
      this.renderer.setStyle(this.tooltip, 'position', 'absolute');      
      this.renderer.setStyle(this.tooltip, 'background', 'black');      
      this.renderer.setStyle(this.tooltip, 'padding', '10px');
      this.renderer.setStyle(this.tooltip, 'border-radius', '5px');
      this.renderer.setStyle(this.tooltip, 'color', 'white');
      this.renderer.setStyle(this.tooltip, 'top', `${this.elementRef.nativeElement.offsetTop - 50}px`);
      this.renderer.setStyle(this.tooltip, 'left', `${this.elementRef.nativeElement.offsetLeft - 5}px`);
      this.renderer.setStyle(this.tooltip, 'z-index', '1000');
    });
    
    this.elementRef.nativeElement.addEventListener('mouseout', () => {
      this.renderer.setStyle(this.tooltip, 'display', 'none');
    });
    
    this.tooltipTextNode = this.renderer.createText(this.appTooltip() || '');
    this.renderer.appendChild(this.tooltip, this.tooltipTextNode);
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltip);
  }

}
