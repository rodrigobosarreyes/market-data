import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly API_URL = 'https://integra1.solutions.webfg.ch/restweb';
  private token: any;
  // secrets
  private CLIENT_ID = 'webfg-test';
  private CLIENT_PWD = 'WW58YJj89ltR43Cr';

  constructor(private readonly http: HttpClient) { }

  public login() {
    const credentials = new HttpParams()
      .set('grant_type', 'password')
      .set('username', 'test001')
      .set('scope', 'uaa.user')
      .set('password', 'ryby3NTyKduAMcvZ');
    const loginHeaders = new HttpHeaders({
      'Authorization': `Basic ${btoa(this.CLIENT_ID + ':' + this.CLIENT_PWD)}`
    });
    return this.http
      .post(`${AuthService.API_URL}/oauth/token?${credentials}`, null, {headers: loginHeaders})
      .pipe(tap(t => this.token = t));
  }

  public getToken(): any {
    return this.token;
  }
}
