import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  getCoupons() {
    return this.http.get('https://ai-ecommerce-website-2yam.onrender.com/api/coupons');
  }

  applyCoupon(code: string, total: number) {
    return this.http.post('https://ai-ecommerce-website-2yam.onrender.com/api/coupons/apply', {
      code,
      total,
    });
  }
}
