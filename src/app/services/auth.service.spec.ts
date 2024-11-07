import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { mockLoginData, mockAuthResponse, mockErrorResponse } from '../mocks/mock-auth-data';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully and return an auth token', (done) => {
    service.login(mockLoginData.username, mockLoginData.password).subscribe((response) => {
      expect(response.token).toEqual(mockAuthResponse.token);
      done();
    });

    const req = httpMock.expectOne('http://localhost:9999/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should handle login failure and return an error', (done) => {
    service.login(mockLoginData.username, 'wrongPassword').subscribe({
      next: () => fail('Expected an error, not a token'),
      error: (error) => {
        expect(error.error).toEqual(mockErrorResponse.error);
        done();
      }
    });

    const req = httpMock.expectOne('http://localhost:9999/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 401, statusText: 'Unauthorized' });
  });
});
