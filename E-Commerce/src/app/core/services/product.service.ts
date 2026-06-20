import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // All Products (custom limit)
  getProducts(limit: number = 194, skip: number = 0) {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  // Single Product
  getProductById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Search Products (API Search)
  searchProducts(searchText: string) {
    return this.http.get<any>(`${this.apiUrl}/search?q=${encodeURIComponent(searchText)}`);
  }

  // Categories
  getCategories() {
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  // Products By Category
  getProductsByCategory(category: string) {
    return this.http.get<any>(`${this.apiUrl}/category/${encodeURIComponent(category)}`);
  }

  // Load all products for Fuse.js
  getAllProducts() {
    return this.http.get<any>(`${this.apiUrl}?limit=194&skip=0`);
  }
}
