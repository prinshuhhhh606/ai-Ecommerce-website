import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
export class CheckoutComponent {
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
    // Data jo Products page ne save kiya tha
    const checkoutData = localStorage.getItem('CHECKOUT_DATA');

    if (checkoutData) {
      const res = JSON.parse(checkoutData);

      this.cartItems = res.items || [];
      this.totalAmount = res.totalAmount || 0;
      this.discount = res.discount || 0;
      this.payableAmount = res.payableAmount > 0 ? res.payableAmount : this.totalAmount;
    }
  }

  payNow(): void {
    console.log('PAY NOW CLICKED');

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

    console.log('ORDER DATA =>', orderData);

    this.orderService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        console.log('ORDER SUCCESS =>', response);

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
        console.error('ORDER ERROR =>', err);
        alert(err.error?.message || 'Order Failed');
      },
    });
  }
}
