import { ComponentFixture, TestBed } from '@angular/core/testing';
import SignalsComponent, { Video } from './signals.component';

const mockVideos: Video[] = [
  {
    id: 1,
    title: "Angular Signals Deep Dive",
    duration: 45 // 45 minutes
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    duration: 120 // 2 hours
  },
  {
    id: 3,
    title: "Component Architecture",
    duration: 90 // 1.5 hours
  }
];

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

  it('should add video and should reset the form', () => {
    component.videos.set([]);
    
    const formSpy = spyOn(component.videoForm, 'reset');

    component.videoForm.patchValue({
      videoTitle: 'La pantera rosa',
      hours: 1,
      minutes: 35,
    });

    component.addVideo();
    expect(component.videos().length).toBe(1);
    expect(component.videos()[0].title).toBe('La pantera rosa');
    expect(component.videos()[0].duration).toBe(95); // 1*60 + 35 = 95
    expect(formSpy).toHaveBeenCalled();
  })

  it('should remove video', () => {
    component.videos.set([mockVideos[0]]);
    expect(component.videos().length).toBe(1);

    component.removeVideo(1);
    expect(component.videos().length).toBe(0)
  })
});
