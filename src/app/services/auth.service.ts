import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private encryptionKey = CryptoJS.enc.Utf8.parse('my-secret-key-12');

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  login(username: string, password: string): Observable<{ token: string }> {
    console.log('Attempting login:', { username });
    const encryptedPassword = CryptoJS.AES.encrypt(password, this.encryptionKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    console.log('Encrypted Password:', encryptedPassword);
    return this.http.post<{ token: string }>(`${this.apiUrl}/authenticate`, { username, password: encryptedPassword });
  }

  register(username: string, password: string): Observable<{ message: string }> {
    console.log('Attempting registration:', { username });

    const encryptedPassword = CryptoJS.AES.encrypt(password, this.encryptionKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();

    console.log('Encrypted Password:', encryptedPassword);
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { username, password: encryptedPassword });
  }

  public isAuthenticated(): boolean {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (isBrowser) {
      const token = localStorage.getItem('token');
      const isExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
      console.log('Token status:', { token, isExpired });
      return token ? !isExpired : false;
    } else {
      return false;
    }
  }

  public logout(): void {
    console.log('Logging out');
    localStorage.removeItem('token');
  }
}
