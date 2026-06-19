import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

import { filter } from 'rxjs/operators';

import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  product = new FormControl('');

  isLoggedIn = false;

  constructor(
    private router: Router,
    public cartService: CartService,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLoginStatus();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');

    console.log('isLoggedIn =>', this.isLoggedIn);
  }

  search(): void {
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

  Login(): void {
    this.router.navigate(['/login']);
  }

  cart(): void {
    this.router.navigate(['/cart']);
  }

  wishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  AIsearch(): void {
    this.router.navigate(['/ai-search']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.isLoggedIn = false;

    this.router.navigate(['/login']);
  }
}
