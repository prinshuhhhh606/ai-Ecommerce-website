import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
    // Load cart items
    this.cartItems = this.cartService.getCartItems();

    // Calculate total
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    // Default values
    this.discount = 0;
    this.payableAmount = this.totalAmount;

    // Load coupon from localStorage
   const savedCoupon = localStorage.getItem('appliedCoupon');

   if (savedCoupon) {
     this.appliedCoupon = JSON.parse(savedCoupon) as Coupon;

     this.discount = this.appliedCoupon.discount;
     this.payableAmount = this.appliedCoupon.finalAmount;
   } else {
     this.discount = 0;
     this.payableAmount = this.totalAmount;
   }

    console.log('Cart Items =>', this.cartItems);
    console.log('Total Amount =>', this.totalAmount);
    console.log('Coupon =>', this.appliedCoupon);
    console.log('Discount =>', this.discount);
    console.log('Payable =>', this.payableAmount);
  }

  payNow(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderData = {
      items: this.cartItems.map((item) => ({
        productId: item._id || item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        thumbnail: item.thumbnail,
        category: item.category,
      })),

      totalAmount: this.totalAmount,

      // Backend coupon verify karega
      code: this.appliedCoupon?.code || null,
    };

    console.log('ORDER REQUEST =>', orderData);

    this.orderService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        console.log('ORDER SUCCESS =>', response);

        this.cartService.clearCart();

        localStorage.removeItem('appliedCoupon');

        this.router.navigate(['/order-success'], {
          queryParams: {
            orderId: response.data?._id,
          },
        });
      },

      error: (err) => {
        console.error('ORDER ERROR =>', err);

        alert(err.error?.message || 'Failed to place order');
      },
    });
  }
}
