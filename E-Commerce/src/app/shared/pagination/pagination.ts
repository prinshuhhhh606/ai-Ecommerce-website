import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.services';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
})
export class PaginationComponent implements OnInit {
  products: any[] = [];

  currentPage = 1;
  limit = 12;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchText = params['search'];

      if (searchText) {
        this.searchProducts(searchText);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;

    this.productService.getProducts(this.limit, skip).subscribe({
      next: (response: any) => {
        this.products = response.products || [];

        this.totalPages = Math.ceil(response.total / this.limit);
        this.cd.detectChanges();
      },
      
      error: (error) => {
        console.error('Products Load Error:', error);
    
      },
      
    });
  }

  searchProducts(searchText: string): void {
    this.productService.searchProducts(searchText).subscribe({
      next: (response: any) => {
        this.products = response.products || [];

        this.totalPages = 1;
        this.currentPage = 1;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Search Error:', error);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);

    console.log('Added To Cart:', product.title);

    
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.loadProducts();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.loadProducts();

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }



    addToWishlist(product: any): void {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first');
    this.router.navigate(['/login']);
    return;
  }

  const wishlist = JSON.parse(
    localStorage.getItem('wishlist') || '[]'
  );

  const exists = wishlist.find(
    (item: any) => item.id === product.id
  );

  if (exists) {
    alert('Already in wishlist');
    return;
  }

  wishlist.push(product);

  localStorage.setItem(
    'wishlist',
    JSON.stringify(wishlist)
  );

  alert('Added to wishlist ❤️');

  }
}
