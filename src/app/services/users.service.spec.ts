import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsersService);
  });

  afterEach(() => {
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
