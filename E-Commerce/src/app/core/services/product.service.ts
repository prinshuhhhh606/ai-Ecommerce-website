import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number) {
    return this.http.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  }

  searchProducts(searchText: string) {
    return this.http.get(`https://dummyjson.com/products/search?q=${searchText}`);
  }
}
