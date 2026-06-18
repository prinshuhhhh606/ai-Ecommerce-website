import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/whistlist.services';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
})
export class Wishlist {
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistItems = this.wishlistService.getWishlist();

    this.wishlistService.wishlist$.subscribe((items) => {
      this.wishlistItems = items;
    });
  }

  removeItem(id: string) {
    this.wishlistService.removeFromWishlist(id);
  }
}
