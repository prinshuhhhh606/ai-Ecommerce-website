import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'https://ai-ecommerce-website-2yam.onrender.com';

  constructor(private http: HttpClient) {}

  // CREATE PAYMENT
  createOrder(amount: number, customer?: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/create-payment`, {
      amount,
      customer,
    });
  }

  // GET PAYMENT
  getPayment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }

  // VERIFY PAYMENT
  verifyOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }
}
