import { ComponentFixture, TestBed } from "@angular/core/testing";
import ControlFlowComponent from "./control-flow.component";

describe('ControlFlow Testing', () => {
    let component: ControlFlowComponent;
    let fixture: ComponentFixture<ControlFlowComponent>
    let compiled: HTMLElement;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ControlFlowComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(ControlFlowComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;

        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should toggleContent', () => {
        const toggleButton = compiled.querySelector('[data-test="toggle"]') as HTMLButtonElement
        toggleButton.click();

        expect(component.showContent()).toBeTrue();

        toggleButton.click();
        
        expect(component.showContent()).toBeFalse();
    })


});