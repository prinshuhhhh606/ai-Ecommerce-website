import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  addToCart(product: any) {
 
  const exists = this.cartItems.find((item) => item.id === product.id);

  if (!exists) {
    this.cartItems.push(product);
  }

      console.log(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  
}