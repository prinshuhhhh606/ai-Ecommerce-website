import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // All Products
  getProducts(limit: number = 20, skip: number = 0) {
    return this.http.get(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  // Single Product
  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Search Products
  searchProducts(searchText: string) {
    return this.http.get(`${this.apiUrl}/search?q=${searchText}`);
  }

  // Categories
  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // Products By Category
  getProductsByCategory(category: string) {
    return this.http.get(`${this.apiUrl}/category/${category}`);
  }
}
