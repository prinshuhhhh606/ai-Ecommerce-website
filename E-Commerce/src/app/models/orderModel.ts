import { Product } from './productModel';
export interface Order {
  _id?: string;
  userId?: string;

  items: {
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity: number;
  }[];

  totalAmount: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}