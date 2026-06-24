import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css'],
})
export class WalletComponent {
  walletTransactions = [
    {
      customer: 'Rahul Sharma',
      transactionId: 'TXN001245',
      type: 'Credit',
      amount: 500,
      status: 'Completed',
    },
  ];
  searchText = '';

  transactions = [
    {
      id: 1001,
      date: '20-06-2026',
      description: 'Wallet Recharge',
      type: 'Credit',
      amount: 5000,
      status: 'Success',
    },
    {
      id: 1002,
      date: '21-06-2026',
      description: 'Mobile Recharge',
      type: 'Debit',
      amount: 399,
      status: 'Success',
    },
    {
      id: 1003,
      date: '22-06-2026',
      description: 'Electricity Bill',
      type: 'Debit',
      amount: 1250,
      status: 'Pending',
    },
    {
      id: 1004,
      date: '23-06-2026',
      description: 'Cashback',
      type: 'Credit',
      amount: 200,
      status: 'Success',
    },
  ];
}
