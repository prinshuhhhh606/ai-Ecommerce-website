import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  

  getProfile() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  verifyReferral(code: string) {
    return this.http.post(`${this.apiUrl}/verify-referral`, { referralCode: code });
  }
}
