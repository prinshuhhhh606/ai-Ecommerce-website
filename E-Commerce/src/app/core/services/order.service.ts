import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/orderModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://ai-ecommerce-website-2yam.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  // Create Order
  placeOrder(order: Order): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  // Get All Orders
  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get Single Order
  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update Status
  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  // Delete Order
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
