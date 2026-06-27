import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  addToCart(product: any) {
    const exists = this.cartItems.find((item) => item._id === product._id);

    if (!exists) {
      this.cartItems.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    console.log(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];

    localStorage.removeItem('cart');
  }
}
