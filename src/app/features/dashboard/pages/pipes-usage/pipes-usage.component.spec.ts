import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesUsageComponent } from './pipes-usage.component';

describe('PipesUsageComponent', () => {
  let component: PipesUsageComponent;
  let fixture: ComponentFixture<PipesUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipesUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
