import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Wallet Payment (Top-up)
  walletPayment(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/wallet/wallet-payment`, {
      amount,
    });
  }

  // Product Payment
  createOrder(amount: number, customer?: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/order-payment`, {
      amount,
      customer,
    });
  }

  // Get Payment
  getPayment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }

  // Verify Payment
  verifyOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }
}
