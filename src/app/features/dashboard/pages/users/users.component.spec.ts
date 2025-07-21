import { UsersService } from "@core/services/users.service";
import UsersComponent from "./users.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('UsersComponent', () => {
    let component: UsersComponent;
    let usersService: UsersService;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [UsersComponent],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        // Mock the methods of UsersService that are used in UsersComponent
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        usersService = TestBed.inject(UsersService);
    });


    it('should create UsersComponent', () => {
        expect(component).toBeTruthy();
    });





});







