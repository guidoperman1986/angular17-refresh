import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { TooltipDirective } from "./tooltip.directive";

@Component({
  template: `<div appTooltip="Test tooltip">Hover me</div>`,
  imports: [TooltipDirective]
})
class TestComponent {}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create tooltip element on init', () => {
    const hostElement = fixture.nativeElement.querySelector('div[appTooltip]');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    expect(tooltipElement).toBeTruthy();
    expect(tooltipElement.textContent).toBe('Test tooltip');
    expect(tooltipElement.classList.contains('tooltip')).toBe(true);
  });

  it('should initially hide the tooltip', () => {
    const hostElement = fixture.nativeElement.querySelector('div[appTooltip]');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    expect(tooltipElement.style.display).toBe('none');
  });

  it('should show tooltip on mouseover', () => {
    const hostElement = fixture.nativeElement.querySelector('div[appTooltip]');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    // Trigger mouseover event
    hostElement.dispatchEvent(new MouseEvent('mouseover'));
    
    expect(tooltipElement.style.display).toBe('block');
    expect(tooltipElement.style.position).toBe('absolute');
    expect(tooltipElement.style.background).toBe('black');
    expect(tooltipElement.style.color).toBe('white');
  });

  it('should hide tooltip on mouseout', () => {
    const hostElement = fixture.nativeElement.querySelector('div[appTooltip]');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    // First show the tooltip
    hostElement.dispatchEvent(new MouseEvent('mouseover'));
    expect(tooltipElement.style.display).toBe('block');
    
    // Then hide it
    hostElement.dispatchEvent(new MouseEvent('mouseout'));
    expect(tooltipElement.style.display).toBe('none');
  });

  it('should apply correct styling when shown', () => {
    const hostElement = fixture.nativeElement.querySelector('div[appTooltip]');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    hostElement.dispatchEvent(new MouseEvent('mouseover'));
    
    expect(tooltipElement.style.position).toBe('absolute');
    expect(tooltipElement.style.background).toBe('black');
    expect(tooltipElement.style.padding).toBe('10px');
    expect(tooltipElement.style.borderRadius).toBe('5px');
    expect(tooltipElement.style.color).toBe('white');
    expect(tooltipElement.style.zIndex).toBe('1000');
  });
});

@Component({
  template: `<div [appTooltip]="tooltipText()">Dynamic tooltip</div>`,
  imports: [TooltipDirective]
})
class DynamicTestComponent {
  tooltipText = signal('Dynamic content');
}

describe('TooltipDirective with dynamic content', () => {
  let component: DynamicTestComponent;
  let fixture: ComponentFixture<DynamicTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display dynamic tooltip content', () => {
    const hostElement = fixture.nativeElement.querySelector('div');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    expect(tooltipElement.textContent).toBe('Dynamic content');
  });

  it('should update tooltip content when signal changes', () => {
    const hostElement = fixture.nativeElement.querySelector('div');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    // Change the signal value
    component.tooltipText.set('Updated content');
    fixture.detectChanges();
    
    expect(tooltipElement.textContent).toBe('Updated content');
  });
});

@Component({
  template: `<div appTooltip="">Empty tooltip</div>`,
  imports: [TooltipDirective]
})
class EmptyTooltipTestComponent {}

describe('TooltipDirective edge cases', () => {
  it('should handle empty tooltip text', async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTooltipTestComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(EmptyTooltipTestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement.querySelector('div');
    const tooltipElement = hostElement.querySelector('.tooltip');
    
    expect(tooltipElement.textContent).toBe('');
  });
});
