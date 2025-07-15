import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import ChangeDetectionComponent from "./change-detection.component";

describe('ChangeDetectionComponent', () => {
    let component: ChangeDetectionComponent;
    let fixture: ComponentFixture<ChangeDetectionComponent>;
    let compiled: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ChangeDetectionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeDetectionComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('currentFramework computed property', () => {
        it('should return initial framework value', () => {
            const currentFramework = component.currentFramework();
            console.log('Current Framework:', currentFramework);
            expect(currentFramework).toBe('Change detection - Angular');
            expect(currentFramework).not.toBe('');
        });

        /* it('should update framework value after 3000ms', fakeAsync(() => {
            expect(component.frameworkAsSignal().name).toBe('Angular');
            expect(component.currentFramework()).toBe('Change detection - Angular');

            tick(3000);

            expect(component.frameworkAsSignal().name).toBe('React')
        })); */

        xit('should update frameworkAsSignal after 3000ms', fakeAsync(() => {
            // Initial state
            expect(component.frameworkAsSignal().name).toBe('Angular');
            expect(component.currentFramework()).toBe('Change detection - Angular');

            // Fast-forward time by 3000ms
            tick(3000);

            // Verify signal was updated
            expect(component.frameworkAsSignal().name).toBe('React');
            expect(component.currentFramework()).toBe('Change detection - React');
        }));
    });



})