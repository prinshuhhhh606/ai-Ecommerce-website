import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { CartService } from '../../core/services/cart.services';
import { PaymentService } from '../../core/services/paymentServices';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Coupon {
  code: string;
  discount: number;
  finalAmount: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  totalAmount = 0;
  discount = 0;
  payableAmount = 0;

  cartItems: any[] = [];
  appliedCoupon: Coupon | null = null;

  isLoading = false;

  constructor(
    public cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private paymentService: PaymentService,
  ) {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  // ========================
  // INIT
  // ========================
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.loadCheckoutSummary();
  }

  // ========================
  // REMOVE ITEM
  // ========================
  removeItem(item: any): void {
    this.cartService.removeItem(item.productId).subscribe({
      next: () => {
        this.cartService.getCartFromServer().subscribe({
          next: (cart: any) => {
            this.cartService.syncCartFromResponse(cart.items);
          },
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });
  }

  // ========================
  // LOAD CHECKOUT SUMMARY
  // ========================
  loadCheckoutSummary(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.paymentService.getCheckoutSummary(userId).subscribe({
      next: (res: any) => {
        this.cartItems = res.items || [];
        this.totalAmount = res.totalAmount || 0;
        this.discount = res.discount || 0;

        this.payableAmount = res.payableAmount > 0 ? res.payableAmount : this.totalAmount;
      },
      error: (err) => console.error('CHECKOUT ERROR =>', err),
    });
  }

  // ========================
  // PROCEED TO CHECKOUT
  // ========================
  proceedToCheckout(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: 'checkout' },
      });
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.isLoading = true;

    // 🔥 STEP: backend calculate before checkout
    this.paymentService.getCheckoutSummary(userId).subscribe({
      next: (res: any) => {
        console.log('CHECKOUT CALCULATION =>', res);

        // store temporarily
        localStorage.setItem('CHECKOUT_DATA', JSON.stringify(res));

        this.isLoading = false;

        // navigate
        this.router.navigate(['/checkout']);
      },

      error: (err) => {
        console.error('CHECKOUT ERROR =>', err);
        this.isLoading = false;
      },
    });
  }
}

// import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// import { PaymentService } from '../../core/services/paymentServices';
// import { CartService } from '../../core/services/cart.services';
// import { OrderService } from '../../core/services/order.service';

// interface Coupon {
//   code: string;
//   discount: number;
//   finalAmount: number;
// }

// @Component({
//   selector: 'app-checkout',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './checkout.html',
//   styleUrls: ['./checkout.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class CheckoutComponent implements OnInit {
//   totalAmount = 0;
//   discount = 0;
//   payableAmount = 0;

//   cartItems: any[] = [];
//   appliedCoupon: Coupon | null = null;

//   constructor(
//     private paymentService: PaymentService,
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router,
//     private cd: ChangeDetectorRef,
//   ) {}
