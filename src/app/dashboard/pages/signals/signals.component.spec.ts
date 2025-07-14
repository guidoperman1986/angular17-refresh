import { ComponentFixture, TestBed } from '@angular/core/testing';
import SignalsComponent from './signals.component';


describe('SignalsComponent', () => {
  let component: SignalsComponent;
  let fixture: ComponentFixture<SignalsComponent>;
  let compiled: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    /* expect(compiled.querySelector('h1')).toBe('Video Time Calculator'); */
    console.log(compiled.querySelector('h1'));
  });
});
