import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  walletPayment(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/wallet/wallet-payment`, {
      amount,
    });
  }

  // Product Payment
  createOrder(data: any, customer?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/order-payment`, data);
  }

  getPayment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }

  verifyOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment/payment/${id}`);
  }
}
