import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    }
  }

  ngOnInit(): void {
    const couponData = localStorage.getItem('appliedCoupon');

    if (couponData) {
      const coupon: Coupon = JSON.parse(couponData);

      this.appliedCoupon = coupon;
      this.discount = coupon.discount;
      this.payableAmount = coupon.finalAmount;
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
