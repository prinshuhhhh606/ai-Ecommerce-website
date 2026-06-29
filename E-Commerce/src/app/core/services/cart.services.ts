import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(body: any) {
    return this.http.post(`${environment.apiUrl}/api/cart/add`, body);
  }

  // ✅ GET CART FROM SERVER
  getCartFromServer() {
    const userId = localStorage.getItem('userId');

    return this.http.get(`${environment.apiUrl}/api/cart/${userId}`);
  }
  // ✅ SYNC CART (ONLY ONE FUNCTION)
  syncCartFromResponse(cartItems: any[]) {
    console.log('SYNC CART ITEMS:', cartItems);

    this.cartItems = cartItems;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartSubject.next([...cartItems]);
  }

  // ✅ LOCAL GET
  getCartItems() {
    return [...this.cartItems];
  }

  // ✅ REMOVE ITEM
  removeItem(productId: string) {
    const userId = localStorage.getItem('userId');

    return this.http.post(`${environment.apiUrl}/api/cart/remove`, {
      userId,
      productId,
    });
  }

  // ✅ CLEAR CART
  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  // ✅ UPDATE STATE
  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }
}
