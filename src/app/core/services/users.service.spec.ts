import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { User } from '../../types';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    /* service = TestBed.inject(UsersService); */
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make http request in the contructor', () => {
    service = TestBed.inject(UsersService);

    // Expect the HTTP request that happens in constructor
    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('GET');    

    // Respond with mock data
    req.flush({ data: [mockUser] });
  });


  it('should fetch user by id', () => {
    // Inject service and handle constructor request
    service = TestBed.inject(UsersService);
    const constructorReq = httpMock.expectOne('https://reqres.in/api/users');
    constructorReq.flush({ data: [mockUser] });

    const userId = '1';

    // Call the service method
    service.getUserById(userId).subscribe(response => {
      expect(response).toEqual(mockUser);
    });

    // Expect the HTTP request and provide mock response
    const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockUser);
  });

  it('should handle HTTP error', () => {
    // Inject service and handle constructor request
    service = TestBed.inject(UsersService);
    const constructorReq = httpMock.expectOne('https://reqres.in/api/users');
    constructorReq.flush({ data: [mockUser] });

    const userId = '1';
    const errorMessage = 'User not found';

    service.getUserById(userId).subscribe({
      next: () => fail('Expected error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});

/* import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from '../../types';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: jasmine.SpyObj<UsersService>

  const mockUser: User = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@gmail.com',
    avatar: 'https://example.com/avatar.jpg'
  }

  const mockUsers = [mockUser];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UsersService', [
      'getUserById'
    ], {
      // Mock properties (signals)
      users: jasmine.createSpy('users').and.returnValue(mockUsers),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      error: jasmine.createSpy('error').and.returnValue(null)
    })

    TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    })

    service = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get user by id', () => {
    service.getUserById.and.returnValue(of(mockUser));

    service.getUserById('1').subscribe(user => {
      expect(user).toEqual(mockUser)
    })
  })



})


 */