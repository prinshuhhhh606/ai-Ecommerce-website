import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Coupon {
  code: string;
  description: string;
  discount?: number;
}

@Component({
  selector: 'app-coupon',
  imports: [FormsModule,CommonModule],
  templateUrl: './coupan.html',
  styleUrls: ['./coupan.css'],
})
export class CouponComponent {
  couponCode: string = '';

  coupons: Coupon[] = [
    { code: 'SAVE10', description: 'Get 10% off on your order', discount: 10 },
    { code: 'WELCOME20', description: 'Flat 20% discount for new users', discount: 20 },
    { code: 'FREESHIP', description: 'Free shipping on all orders' },
  ];

  appliedCoupon: Coupon | null = null;

  applyCoupon(): void {
    if (!this.couponCode) {
      alert('Please enter a coupon code');
      return;
    }

    const found = this.coupons.find((c) => c.code.toLowerCase() === this.couponCode.toLowerCase());

    if (found) {
      this.apply(found);
    } else {
      alert('Invalid coupon code');
    }
  }

  useCoupon(code: string): void {
    const found = this.coupons.find((c) => c.code === code);

    if (found) {
      this.apply(found);
    }
  }

  private apply(coupon: Coupon): void {
    this.appliedCoupon = coupon;
    alert(`Coupon applied: ${coupon.code}`);
    console.log('Applied coupon:', coupon);
  }
}
