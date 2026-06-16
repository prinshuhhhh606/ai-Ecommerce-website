import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  product = new FormControl('');

  constructor(
    private router: Router,
    public cartService: CartService,
  ) {}

  search() {
    const searchText = this.product.value;

    if (!searchText?.trim()) {
      alert('Please enter a product name');
      return;
    }

    this.router.navigate(['/product'], {
      queryParams: {
        search: searchText,
      },
    });
  }

  Login() {
    this.router.navigate(['/login']);
  }

  cart() {
    this.router.navigate(['/cart']);
  }

  AIsearch() {
    this.router.navigate(['/ai-search']);
  }
}
