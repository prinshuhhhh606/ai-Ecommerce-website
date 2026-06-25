import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = 'https://ai-ecommerce-website-2yam.onrender.com/api/wallet';

  constructor(private http: HttpClient) {}

  getWallet(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getTransactions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${userId}`);
  }

  addMoney(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-money/${userId}`, { amount });
  }

  payMoney(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay/${userId}`, { amount });
  }
}
