import { ComponentFixture, TestBed } from "@angular/core/testing"
import OutputComponent from "./output.component"
import { TitleComponent } from "@shared/index";

describe('Output component testing', () => {
    let component: OutputComponent
    let fixture: ComponentFixture<OutputComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OutputComponent, TitleComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OutputComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;

        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should show something when showText is invoked', () => {
        const alertSpy = spyOn(window, 'alert');

        component.showText('something');

        expect(alertSpy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledOnceWith('something');
        expect(alertSpy).toHaveBeenCalledTimes(1);
    })

    it('should add value when showCount is invoked', ()=> {
        component.showCount();
    })








})