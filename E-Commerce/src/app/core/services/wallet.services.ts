import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = `${environment.apiUrl}/api/wallet`;

  constructor(private http: HttpClient) {}

  getWallet(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  getTransactions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${userId}`);
  }


  addMoney(userId: string, amount: number, paymentStatus: string) {
    return this.http.post(`${this.apiUrl}/add-money/${userId}`, {
      amount,
      paymentStatus,
    });
  }

  payMoney(userId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay/${userId}`, { amount });
  }
}
