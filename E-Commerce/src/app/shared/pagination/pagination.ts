// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

// import { CommonModule } from '@angular/common';
// import { Router, ActivatedRoute } from '@angular/router';

// import { ProductService } from '../../core/services/product.service';
// import { CartService } from '../../core/services/cart.services';
// import Fuse from 'fuse.js'; // 1. Fuse.js import kiya

// @Component({
//   selector: 'app-pagination',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pagination.html',
//   styleUrls: ['./pagination.css'],
// })
// export class PaginationComponent implements OnInit {
//   products: any[] = [];

//   allProductsForSearch: any[] = [];


//   loading = true;
//   currentPage = 1;
//   limit = 12;
//   totalPages = 0;

//   fuse!: Fuse<any>;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private cd: ChangeDetectorRef,
//   ) {}

//   ngOnInit(): void {

//      this.productService.getProducts(194, 0).subscribe({
//       next: (response: any) => {
//         this.allProductsForSearch = response.products || [];

//         this.fuse = new Fuse(this.allProductsForSearch, {
//           keys: ['title', 'category', 'brand'],
//           threshold: 0.6,
//           distance: 100,
//           ignoreLocation: true,
//         });


//     this.route.queryParams.subscribe((params) => {
//       const searchText = params['search'];

//       if (searchText) {
//         this.searchProducts(searchText);
//       } else {
//         this.loadProducts();
//       }
//     });
//   }

//   loadProducts(): void {
//     this.loading = true;
//     const skip = (this.currentPage - 1) * this.limit;

//     this.productService.getProducts(this.limit, skip).subscribe({
//       next: (response: any) => {
//         this.products = response.products || [];

//         this.totalPages = Math.ceil(response.total / this.limit);
//         this.loading = false;
//         this.cd.detectChanges();
//       },

//       error: (error) => {
//         console.error('Products Load Error:', error);
//         this.loading = false;
//       },
//     });
//   }

//     searchProductsLocal(searchText: string): void {
//     if (this.fuse) {
//       const results = this.fuse.search(searchText);
//       this.products = results.map((result) => result.item);

//       this.totalPages = 1;
//       this.currentPage = 1;
//       this.cd.detectChanges();
//     }
//   }



//   searchProducts(searchText: string): void {
//     this.searchProductsLocal(searchText);
//   }

//   // searchProducts(searchText: string): void {
//   //   this.loading = true;
//   //   this.productService.searchProducts(searchText).subscribe({
//   //     next: (response: any) => {
//   //       this.products = response.products || [];

//   //       this.totalPages = 1;
//   //       this.currentPage = 1;
//   //        this.loading = false;
//   //       this.cd.detectChanges();
//   //     },
//   //     error: (error) => {
//   //       console.error('Search Error:', error);
//   //        this.loading = false;
//   //     },
//   //   });
//   // }

//   addToCart(product: any): void {
//     this.cartService.addToCart(product);

//     console.log('Added To Cart:', product.title);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;

//       this.loadProducts();

//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;

//       this.loadProducts();

//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   }

//   addToWishlist(product: any): void {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('Please login first');
//       this.router.navigate(['/login']);
//       return;
//     }

//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

//     const exists = wishlist.find((item: any) => item.id === product.id);

//     if (exists) {
//       alert('Already in wishlist');
//       return;
//     }

//     wishlist.push(product);

//     localStorage.setItem('wishlist', JSON.stringify(wishlist));

//     alert('Added to wishlist ❤️');
//   }
// }







import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.services';
import Fuse from 'fuse.js'; // 1. Fuse.js import kiya
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
})
export class PaginationComponent implements OnInit {
  products: any[] = [];
  allProductsForSearch: any[] = [];
  loading = true;
  currentPage = 1;
  limit = 12;
  totalPages = 0;
  fuse!: Fuse<any>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {

    this.productService.getProducts(194, 0).subscribe({
      next: (response: any) => {
        this.allProductsForSearch = response.products || [];

        this.fuse = new Fuse(this.allProductsForSearch, {
          keys: ['title', 'category', 'brand'],
          threshold: 0.3,
          distance: 100,
          ignoreLocation: true,
        });

        this.route.queryParams.subscribe((params) => {
          const searchText = params['search'];
          if (searchText) {
            this.searchProductsLocal(searchText);
          } else {
            this.loadProducts();
          }
        });
      },
    });
  }

  loadProducts(): void {
        this.loading = true;

    const skip = (this.currentPage - 1) * this.limit;
    this.productService.getProducts(this.limit, skip).subscribe({
      next: (response: any) => {
        this.products = response.products || [];
        this.totalPages = Math.ceil(response.total / this.limit);
            this.loading = false;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Products Load Error:', error);
            this.loading = false;
      },
    });
  }

  searchProductsLocal(searchText: string): void {
 this.loading = true;
    if (this.fuse) {
      const results = this.fuse.search(searchText);
      this.products = results.slice(0,10).map((result) => result.item);

      this.totalPages = 1;
      this.currentPage = 1;

    this.loading = false;
      this.cd.detectChanges();
    }
  }

  searchProducts(searchText: string): void {
    this.loading = true;
    this.searchProductsLocal(searchText);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Added To Cart:', product.title);

   Swal.fire({
     icon: 'success',
     title: 'Added to Cart',
     text: `${product.title} added successfully`,
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 2000,
     timerProgressBar: true,
   });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  addToWishlist(product: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.find((item: any) => item.id === product.id);

    if (exists) {
      alert('Already in wishlist');
      return;
    }

    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Added to wishlist ❤️');
  }
}
