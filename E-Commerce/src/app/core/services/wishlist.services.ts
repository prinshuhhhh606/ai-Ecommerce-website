import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: any[] = [];

  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    this.wishlistSubject.next(this.wishlistItems);
  }

  // Add Product
  addToWishlist(product: any): void {
    const exists = this.wishlistItems.find((item) => item.id === product.id);

    if (exists) {
      return;
    }

    this.wishlistItems.push(product);

    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));

    this.wishlistSubject.next(this.wishlistItems);
  }

  // Remove Product
  removeFromWishlist(id: number): void {
    this.wishlistItems = this.wishlistItems.filter((item) => item.id !== id);

    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));

    this.wishlistSubject.next(this.wishlistItems);
  }

  // Get All Wishlist Items
  getWishlist(): any[] {
    return this.wishlistItems;
  }

  // Wishlist Count
  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  // Check Product Exists
  isInWishlist(id: number): boolean {
    return this.wishlistItems.some((item) => item.id === id);
  }

  // Clear Wishlist
  clearWishlist(): void {
    this.wishlistItems = [];

    localStorage.removeItem('wishlist');

    this.wishlistSubject.next([]);
  }
}
