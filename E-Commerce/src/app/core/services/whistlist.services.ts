import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: any[] = [];

  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  addToWishlist(product: any) {
    const exists = this.wishlistItems.find((item) => item._id === product._id);

    if (!exists) {
      this.wishlistItems.push(product);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  removeFromWishlist(id: string) {
    this.wishlistItems = this.wishlistItems.filter((item) => item._id !== id);

    this.wishlistSubject.next(this.wishlistItems);
  }

  getWishlist() {
    return this.wishlistItems;
  }

  getWishlistCount() {
    return this.wishlistItems.length;
  }

  isInWishlist(id: string) {
    return this.wishlistItems.some((item) => item._id === id);
  }
}
