import { ComponentFixture, TestBed } from "@angular/core/testing"
import SignalStoreComponent from "./signalStore.component";

describe('Signal store tests', () => {
    let component: SignalStoreComponent;
    let fixture: ComponentFixture<SignalStoreComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SignalStoreComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SignalStoreComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

    })


    it('should create', () => {
        expect(component).toBeTruthy();
    })
})