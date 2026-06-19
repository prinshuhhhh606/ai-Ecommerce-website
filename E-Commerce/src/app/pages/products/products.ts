import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  constructor(
    public cartService: CartService,
    private router: Router,
    private authService: AuthService,
  ) {}

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  proceedToCheckout(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: 'checkout' },
      });
      return;
    }

    this.router.navigate(['/checkout']);
  }
}
