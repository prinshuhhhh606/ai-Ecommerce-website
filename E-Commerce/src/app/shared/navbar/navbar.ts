import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.services';
import { CartService } from '../../core/services/cart.services';
import { ProductService } from '../../core/services/product.service';

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
  filteredProducts: any[] = [];

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
    this.checkLoginStatus();

    this.product.valueChanges.subscribe((value: string | null) => {
      if (!value || !value.trim()) {
        this.filteredProducts = [];
        return;
      }

      this.productService.searchProducts(value).subscribe((res: any) => {
        this.filteredProducts = (res.products || []).slice(0, 5);
      });
    });
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  search(): void {
    const searchText = this.product.value;

    if (!searchText?.trim()) {
      alert('Please enter a product name');
      return;
    }

    this.filteredProducts = [];

    this.router.navigate(['/product'], {
      queryParams: {
        search: searchText,
      },
    });
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
    this.router.navigate(['/ai-search']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

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
}
