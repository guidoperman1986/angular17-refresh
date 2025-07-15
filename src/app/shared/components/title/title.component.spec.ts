import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleComponent);
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('withShadow', true);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
