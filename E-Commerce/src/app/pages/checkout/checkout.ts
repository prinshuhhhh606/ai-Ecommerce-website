import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/paymentServices';
import { CartService } from '../../core/services/cart.services';
import { OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface Coupon {
  code: string;
  description: string;
  discount: number;
  type: 'flat' | 'percent' | 'shipping';
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class CheckoutComponent {
  totalAmount = 0;
  cartItems: any[] = [];
  appliedCoupon: Coupon | null = null;
  discount = 0;

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Load Cart Items
    this.cartItems = this.cartService.getCartItems();

    // Calculate Total
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    // Load Applied Coupon
    const savedCoupon = localStorage.getItem('appliedCoupon');

    if (savedCoupon) {
      this.appliedCoupon = JSON.parse(savedCoupon);
    }

    console.log('Cart Items:', this.cartItems);
    console.log('Total Amount:', this.totalAmount);
    console.log('Applied Coupon:', this.appliedCoupon);
    console.log('Payable Amount:', this.payableAmount);
  }

  payNow(): void {
    // Cart Empty Check
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Logged User (Example)
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const customer = {
      name: currentUser?.name || 'Guest User',
      email: currentUser?.email || 'guest@gmail.com',
      phone: currentUser?.phone || '9999999999',
    };

    console.log('Customer =>', customer);
    console.log('Original Amount =>', this.totalAmount);
    console.log('Discount =>', this.discount);
    console.log('Final Amount =>', this.payableAmount);
this.paymentService
  .createOrder({
    customer,
    items: this.cartItems.map((item) => ({
      productId: item._id || item.id,
      quantity: item.quantity || 1,
    })),
  })
  .subscribe({
    next: (response: any) => {
      console.log('PAYMENT RESPONSE =>', response);

      const orderData = {
        userId: currentUser?._id || currentUser?.id || 'USER_001',

        originalAmount: this.totalAmount,

        discount: this.discount,

        couponCode: this.appliedCoupon?.code || null,

        totalAmount: this.payableAmount,

        paymentId: response.paymentId,

        platformCommission: response.developerAmount,

        shopkeeperAmount: response.shopkeeperAmount,

        status: 'Pending',

        items: this.cartItems.map((item) => ({
          productId: item._id || item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
          thumbnail: item.thumbnail,
          category: item.category,
        })),
      };

      this.orderService.placeOrder(orderData).subscribe({
        next: (savedOrder: any) => {
          this.cartService.clearCart();
          localStorage.removeItem('appliedCoupon');

          this.router.navigate(['/order-success'], {
            queryParams: {
              orderId: savedOrder._id,
              paymentId: response.paymentId,
            },
          });
        },
        error: (err) => {
          console.error('ORDER SAVE ERROR =>', err);
        },
      });
    },
    error: (err) => {
      console.error('PAYMENT ERROR =>', err);
    },
  });
  }
  get payableAmount(): number {
    if (!this.appliedCoupon) {
      this.discount = 0;
      return this.totalAmount;
    }

    if (this.appliedCoupon.type === 'flat') {
      this.discount = this.appliedCoupon.discount;
    }

    if (this.appliedCoupon.type === 'percent') {
      this.discount = (this.totalAmount * this.appliedCoupon.discount) / 100;
    }

    if (this.appliedCoupon.type === 'shipping') {
      this.discount = 0;
    }

    return Math.max(0, this.totalAmount - this.discount);
  }
}
