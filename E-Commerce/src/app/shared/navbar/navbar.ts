// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router, NavigationEnd, RouterModule } from '@angular/router';
// import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { AuthService } from '../../core/services/auth.services';
// import { CartService } from '../../core/services/cart.services';
// import { ProductService } from '../../core/services/product.service';
// import Fuse from 'fuse.js';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './navbar.html',
//   styleUrls: ['./navbar.css'],
// })
// export class Navbar implements OnInit {
//   product = new FormControl('');

//   isLoggedIn = false;
//   allProducts: any[] = [];
//   filteredProducts: any[] = [];

//   fuse!: Fuse<any>;

//   constructor(
//     private router: Router,
//     public cartService: CartService,
//     private productService: ProductService,
//     private authService: AuthService,
//   ) {
//     this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
//       this.checkLoginStatus();
//     });
//   }

//   ngOnInit(): void {
//     // this.checkLoginStatus();

//     // Load products once
//     this.productService.getProducts().subscribe({
//       next: (res: any) => {
//         this.allProducts = res.products || res || [];

//         this.fuse = new Fuse(this.allProducts, {
//           keys: [
//             { name: 'title', weight: 0.8 },
//             { name: 'brand', weight: 0.1 },
//             { name: 'category', weight: 0.1 },
//           ],
//           threshold: 0.3,
//           ignoreLocation: true,
//           includeScore: true,

//         });
//       },
//       error: (err) => {
//         console.error('Product Load Error', err);
//       },
//     });

//     this.product.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
//       if (!value?.trim()) {
//         this.filteredProducts = [];
//         return;
//       }

//       if (!this.fuse) {
//         return;
//       }

//       const results = this.fuse.search(value);

//       this.filteredProducts = results.slice(0, 5).map((result) => result.item);
//     });
//   }

//   private checkLoginStatus(): void {
//     this.isLoggedIn = !!localStorage.getItem('token');
//   }

//   search(): void {
//     const searchText = this.product.value;

//     if (!searchText?.trim()) {
//       alert('Please enter a product name');
//       return;
//     }

//     this.filteredProducts = [];

//     this.router.navigate(['/product'], {
//       queryParams: {
//         search: searchText,
//       },
//     });
//   }

//   selectProduct(item: any): void {
//     this.product.setValue(item.title);
//     this.filteredProducts = [];
//     this.search();
//   }

//   Login(): void {
//     this.router.navigate(['/login']);
//   }

//   cart(): void {
//     this.router.navigate(['/cart']);
//   }

//   wishlist(): void {
//     if (!this.authService.isLoggedIn()) {
//       this.router.navigate(['/login'], {
//         queryParams: { redirect: 'checkout' },
//       });
//       return;
//     }

//     this.router.navigate(['/wishlist']);
//   }

//   AIsearch(): void {
//     this.router.navigate(['/ai-search']);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');

//     this.isLoggedIn = false;
//     this.router.navigate(['/login']);
//   }

//   startVoiceSearch(): void {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert('Voice Search not supported in this browser');
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.start();

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;

//       this.product.setValue(transcript);
//       this.search();
//     };

//     recognition.onerror = (event: any) => {
//       console.error('Voice Error:', event.error);
//     };
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.services';
import { CartService } from '../../core/services/cart.services';
import { ProductService } from '../../core/services/product.service';
import Fuse from 'fuse.js';

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
  allProducts: any[] = [];
  filteredProducts: any[] = [];

  fuse!: Fuse<any>;

  constructor(
    private router: Router,
    public cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLoginStatus();
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.products || res || [];

        this.fuse = new Fuse(this.allProducts, {
          keys: [
            { name: 'title', weight: 0.8 },
            { name: 'brand', weight: 0.1 },
            { name: 'category', weight: 0.1 },
          ],
          threshold: 0.3,
          distance: 100,
          ignoreLocation: true,
          includeScore: true,
          minMatchCharLength: 2,
        });
      },
    });

    // ✅ Search
    this.product.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      if (!value?.trim()) {
        this.filteredProducts = [];
        return;
      }

      if (this.fuse) {
        const results = this.fuse.search(value);
        this.filteredProducts = results.slice(0, 10).map((r) => r.item);
      }
    });

    // ✅ LOAD CART WHEN NAVBAR STARTS
    this.cartService.getCartFromServer().subscribe({
      next: (res: any) => {
        console.log('Navbar Cart =>', res);
        this.cartService.syncCartFromResponse(res.items);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  search(): void {
    const searchText = this.product.value?.trim();

    if (!searchText) {
      alert('Please enter a search term');
      return;
    }

    const aiKeywords = ['best', 'recommend', 'suggest', 'under', 'cheap', 'top'];

    const isAIQuery = aiKeywords.some((word) => searchText.toLowerCase().includes(word));

    if (isAIQuery) {
      this.router.navigate(['/ai-search'], {
        queryParams: {
          q: searchText,
        },
      });
    } else {
      this.router.navigate(['/product'], {
        queryParams: {
          search: searchText,
        },
      });
    }
  }
  selectProduct(item: any): void {
    this.product.setValue(item.title);
    this.filteredProducts = [];
    this.search();
  }

  Login(): void {
    this.router.navigate(['/login']);
  }

  cart(): void {
    this.router.navigate(['/cart']);
  }

  wishlist(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: 'checkout' },
      });
      return;
    }
    this.router.navigate(['/wishlist']);
  }

  AIsearch(): void {
    this.router.navigate(['admin/ai-search']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.clearSession();
      },
      error: (err) => {
        console.error(err);

        // Backend error होने पर भी frontend logout कर दो
        this.clearSession();
      },
    });
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    this.cartService.clearCart();

    this.isLoggedIn = false;

    this.router.navigate(['/login']);
  }

  
  startVoiceSearch(): void {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice Search not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.product.setValue(transcript);
      this.search();
    };

    recognition.onerror = (event: any) => {
      console.error('Voice Error:', event.error);
    };
  }

  admin(): void {
    this.router.navigate(['/admin']);
  }

  ShowDashboard() {
    this.router.navigate(['/dashboard']);
  }
  ShowCoupan() {
    this.router.navigate(['/coupan']);
  }
  ShowWallet() {
    this.router.navigate(['/wallet']);
  }
  ShowReferral() {
    this.router.navigate(['/referral']);
  }
}
