import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

export interface PaymentRequest {
  amount: number;
  customer: CustomerData;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // CREATE PAYMENT
  createOrder(amount: number, customer?: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment`, {
      amount,
      customer,
    });
  }

  // GET PAYMENT BY ID
  getPayment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/${id}`);
  }

  verifyOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/${orderId}`);
  }
}