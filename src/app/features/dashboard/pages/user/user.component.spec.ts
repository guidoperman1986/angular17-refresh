import { ComponentFixture, TestBed } from "@angular/core/testing"
import UserComponent from "./user.component"
import { TitleComponent } from "@shared/index";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "@core/index";
import { User } from '../../../../types/req-res.interface'


const mockActivatedRoute = {
    params: of({ id: '123' }),
    queryParams: of({}),
    snapshot: {
        params: { id: '123' },
        queryParams: {}
    }
}

const mockUser: User = {
    id: 1,
    email: '',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://example.com/avatar.jpg',
}

describe('UserComponent tests', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let mockUserService: jasmine.SpyObj<UsersService>;

    beforeEach(() => {
        // ✅ Create spy with signal properties
        mockUserService = jasmine.createSpyObj('UsersService', ['getUserById']);
        mockUserService.getUserById.and.returnValue(of(mockUser));

        TestBed.configureTestingModule({
            imports: [UserComponent, TitleComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: UsersService, useValue: mockUserService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should mix name and surname and add it to computed userName', () => {
        expect(component.userName()).toBe('John Doe');
    })

    it('should call getUserById with the correct id', () => {
        expect(mockUserService.getUserById).toHaveBeenCalledWith('123');
        expect(mockUserService.getUserById).toHaveBeenCalledTimes(1);
        expect(component.userName()).toBe('John Doe');
    })
})