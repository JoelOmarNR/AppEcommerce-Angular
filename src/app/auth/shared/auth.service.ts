import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

import { Credentials } from './auth.model';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http
      .post(environment.loginUrl, credentials, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;
          const headers = response.headers;

          console.log('headers', headers);

          const bearerToken = headers.get('Authorization')!;
          const token = bearerToken.split('Bearer ')[1];
          const tokenData: any = jwtDecode(token);

          console.log('tokenData', tokenData);

          const expiresAt = moment('1970-01-01').add(tokenData.exp, 'seconds');

          console.log('expiresAt', expiresAt, tokenData.exp);

          localStorage.setItem('mitienda_user_id', tokenData.userId);
          localStorage.setItem('mitienda_name', tokenData.name);
          localStorage.setItem('mitienda_role', tokenData.role);
          localStorage.setItem('mitienda_token', token);
          localStorage.setItem(
            'mitienda_expires_at',
            JSON.stringify(expiresAt.valueOf())
          );

          return body;
        })
      );
  }

  get name() {
    return localStorage.getItem('mitienda_name') || '';
  }

  get token() {
    return localStorage.getItem('mitienda_token');
  }

  isAdmin() {
    return localStorage.getItem('mitienda_role') === 'ADMIN';
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('mitienda_expires_at');

    if (expiration) {
      return moment().isBefore(moment(JSON.parse(expiration)));
    }
    return false;
  }

  logout() {
    localStorage.removeItem('mitienda_user_id');
    localStorage.removeItem('mitienda_name');
    localStorage.removeItem('mitienda_role');
    localStorage.removeItem('mitienda_token');
    localStorage.removeItem('mitienda_expires_at');
  }
}
