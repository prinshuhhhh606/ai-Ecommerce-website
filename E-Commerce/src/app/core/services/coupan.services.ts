import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApplyCouponResponse {
  success: boolean;
  couponCode: string;
  discount: number;
  finalAmount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiUrl = `${environment.apiUrl}/api/coupons`;

  constructor(private http: HttpClient) {}

  // Get all coupons
  getCoupons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  applyCoupon(code: string, orderAmount: number) {
    return this.http.post(`${this.apiUrl}/apply`, {
      code: code.trim(),
      orderAmount: Number(orderAmount),
    });
  }
}
