import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // Get Products with Cache
  getProducts(limit: number = 50, skip: number = 0): Observable<any> {
    const cacheKey = `products_${limit}_${skip}`;

    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return of(JSON.parse(cachedData));
    }

    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`).pipe(
      tap((res) => {
        localStorage.setItem(cacheKey, JSON.stringify(res));
      }),
    );
  }

  // Single Product
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Search Product
  searchProducts(searchText: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${encodeURIComponent(searchText)}`);
  }

  // Categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  // Products By Category
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${encodeURIComponent(category)}`);
  }

  // For Fuse Search
  getAllProducts(): Observable<any> {
    const cachedProducts = localStorage.getItem('all_products');

    if (cachedProducts) {
      return of({
        products: JSON.parse(cachedProducts),
      });
    }

    return this.http.get<any>(`${this.apiUrl}?limit=50`).pipe(
      tap((res) => {
        localStorage.setItem('all_products', JSON.stringify(res.products));
      }),
    );
  }

  // Clear Cache (Optional)
  clearProductCache(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('products_') || key === 'all_products') {
        localStorage.removeItem(key);
      }
    });
  }
}
