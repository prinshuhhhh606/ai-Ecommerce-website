import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from '../../core/services/coupan.services';
import { CartService } from '../../core/services/cart.services';
import { OrderService } from '../../core/services/order.service';

interface Coupon {
  code: string;
  discount: number;
  finalAmount: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  totalAmount = 0;
  discount = 0;
  payableAmount = 0;

  cartItems: any[] = [];
  appliedCoupon: Coupon | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private couponService: CouponService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
    // Products page se aaya checkout data
    const checkoutData = localStorage.getItem('CHECKOUT_DATA');

    if (checkoutData) {
      const res = JSON.parse(checkoutData);

      this.cartItems = res.items || [];
      this.totalAmount = res.totalAmount || 0;

      // Default payable amount
      this.payableAmount = this.totalAmount;

      console.log('TOTAL =>', this.totalAmount);
      console.log('DISCOUNT =>', this.discount);
      console.log('PAYABLE =>', this.payableAmount);
      console.log('COUPON =>', this.appliedCoupon);
    }
  }
  ngOnInit(): void {
    const couponData = localStorage.getItem('appliedCoupon');

    if (couponData) {
      const coupon: Coupon = JSON.parse(couponData);

      this.appliedCoupon = coupon;

      this.couponService.applyCoupon(coupon.code, this.totalAmount).subscribe({
        next: (res: any) => {
          this.discount = res.discount;
          this.payableAmount = res.finalAmount;

          localStorage.setItem(
            'appliedCoupon',
            JSON.stringify({
              code: res.couponCode,
              discount: res.discount,
              finalAmount: res.finalAmount,
            }),
          );

          console.log('TOTAL =>', this.totalAmount);
          console.log('DISCOUNT =>', this.discount);
          console.log('PAYABLE =>', this.payableAmount);
          console.log('COUPON =>', this.appliedCoupon);

          this.cd.detectChanges(); // OnPush ke liye
        },

        error: (err: any) => {
          console.error(err);

          localStorage.removeItem('appliedCoupon');

          this.discount = 0;
          this.payableAmount = this.totalAmount;

          this.cd.detectChanges();
        },
      });
    } else {
      this.discount = 0;
      this.payableAmount = this.totalAmount;

      console.log('TOTAL =>', this.totalAmount);
      console.log('DISCOUNT =>', this.discount);
      console.log('PAYABLE =>', this.payableAmount);
    }
  }
  payNow(): void {
    if (!this.cartItems.length) {
      alert('Cart is empty');
      return;
    }

    const orderData = {
      items: this.cartItems.map((item: any) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
      })),

      totalAmount: this.payableAmount,
      code: this.appliedCoupon?.code || null,
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        this.cartService.clearCart();

        localStorage.removeItem('CHECKOUT_DATA');
        localStorage.removeItem('appliedCoupon');

        this.router.navigate(['/order-success'], {
          queryParams: {
            orderId: response.data?._id,
          },
        });

        this.cd.markForCheck();
      },
      error: (err) => {
        alert(err.error?.message || 'Order Failed');
      },
    });
  }
}
