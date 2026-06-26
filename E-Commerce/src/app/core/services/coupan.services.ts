import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiUrl = `${environment.apiUrl}/api/coupons`;

  constructor(private http: HttpClient) {}

  getCoupons() {
    return this.http.get(this.apiUrl);
  }

  applyCoupon(code: string, total: number) {
    return this.http.post(`${this.apiUrl}/api/coupons/apply`, {
      code,
      total,
    });
  }
}
