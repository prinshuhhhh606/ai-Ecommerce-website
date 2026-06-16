import { Product } from './productModel';

export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
