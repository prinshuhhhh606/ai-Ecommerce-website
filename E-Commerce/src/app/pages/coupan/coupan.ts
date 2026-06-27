import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CouponService } from '../../core/services/coupan.services';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coupan.html',
  styleUrls: ['./coupan.css'],
})
export class CouponComponent implements OnInit {
  couponCode = '';

  coupons: any[] = [
    { code: 'SAVE10', description: 'Get 10% off on orders above ₹500' },
    { code: 'FLAT100', description: 'Flat ₹100 off on orders above ₹1000' },
    { code: 'WELCOME20', description: '20% off for new users' },
    { code: 'FREESHIP', description: 'Free shipping on all orders' },
  ];

  appliedCoupon: any = null;

  totalAmount = 0;

  constructor(
    private couponService: CouponService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCoupons();

    const cartItems = this.cartService.getCartItems();

    this.totalAmount = cartItems.reduce((sum: number, item: any) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    console.log('TOTAL =', this.totalAmount);
  }

  loadCoupons() {
    this.couponService.getCoupons().subscribe({
      next: (res: any) => {
        this.coupons = res.coupons || [];
      },
      error: (err: any) => {
        console.error('Load Coupons Error:', err);
      },
    });
  }

  applyCoupon() {
    if (!this.couponCode.trim()) {
      alert('Enter coupon code');
      return;
    }

    this.couponService.applyCoupon(this.couponCode, this.totalAmount).subscribe({
      next: (res: any) => {
        this.appliedCoupon = {
          code: res.couponCode,
          discount: res.discount,
          finalAmount: res.finalAmount,
        };

        // Save complete response
        localStorage.setItem('appliedCoupon', JSON.stringify(this.appliedCoupon));

        alert(`Coupon Applied Successfully`);

        this.router.navigate(['/checkout']);
      },

      error: (err: any) => {
        alert(err.error?.message || 'Invalid Coupon');
      },
    });
  }
  // ✅ FIXED OUTSIDE FUNCTION (was missing closing bracket before)
  useCoupon(code: string) {
    this.couponCode = code;
    this.applyCoupon();
  }
}
