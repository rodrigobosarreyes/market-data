import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should call login and return a token', () => {
    const expectedToken = { access_token: 'my_token' };

    authService.login().subscribe((token) => {
      expect(token).toEqual(expectedToken);
    });

    const req = httpTestingController.expectOne(`${AuthService.API_URL}/oauth/token?grant_type=password&username=test001&scope=uaa.user&password=ryby3NTyKduAMcvZ`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedToken);

    httpTestingController.verify();
  });

  it('should return the token', () => {
    const token = { access_token: 'my_token' };
    authService['token'] = token;

    const result = authService.getToken();
    expect(result).toEqual(token);
  });
});
