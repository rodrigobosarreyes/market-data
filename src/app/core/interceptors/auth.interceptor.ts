import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authServoce: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('oauth/token')) {
      return next.handle(request);
    }
    const token = this.authServoce.getToken();
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token.access_token)
    });
    return next.handle(request);
  }
}
