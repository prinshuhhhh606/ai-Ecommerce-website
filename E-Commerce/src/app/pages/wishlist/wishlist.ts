import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist.services';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
})
export class Wishlist implements OnInit {
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();

    this.wishlistService.wishlist$.subscribe((items) => {
      this.wishlistItems = items;
    });
  }

  loadWishlist(): void {
    this.wishlistItems = this.wishlistService.getWishlist();
  }

  removeItem(id: any): void {
    this.wishlistService.removeFromWishlist(Number(id));
  }
}
