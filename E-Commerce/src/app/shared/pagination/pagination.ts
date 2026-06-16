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
export class Pagination implements OnInit {
  products: any[] = [];

  currentPage = 1;
  limit = 10;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('Pagination Loaded');

    this.route.queryParams.subscribe((params) => {
      console.log('Params:', params);

      const searchText = params['search'];

      if (searchText) {
        console.log('Search Text:', searchText);

        this.searchProducts(searchText);
      } else {
        console.log('Loading Products');

        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;

    this.productService.getProducts(this.limit, skip).subscribe((response: any) => {
      this.products = response.products;
      this.totalPages = Math.ceil(response.total / this.limit);
      this.cd.detectChanges();
    });
  }
  searchProducts(searchText: string): void {
    this.productService.searchProducts(searchText).subscribe((response: any) => {
      this.products = response.products;

      this.totalPages = 1;

      this.cd.detectChanges();
    });
  }

  buyNow(product: any) {
    this.cartService.addToCart(product);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
}
