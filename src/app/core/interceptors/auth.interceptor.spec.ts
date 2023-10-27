import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should add an Authorization header to the request', () => {
    // Set up the AuthService to return a mock token
    const mockToken = { access_token: 'my_token' };
    spyOn(authService, 'getToken').and.returnValue(mockToken);

    // Make an HTTP request that will be intercepted
    httpClient.get('/some-api-endpoint').subscribe(response => {
      expect(response).toBeTruthy();
    });

    // Expect the request to have been made and the Authorization header added
    const httpRequest = httpTestingController.expectOne('/some-api-endpoint');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer my_token');

    // Flush the request
    httpRequest.flush({ someData: 'data' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
