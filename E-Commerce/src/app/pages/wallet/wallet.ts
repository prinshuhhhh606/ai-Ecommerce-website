import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../core/services/wallet.services';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css'],
})
export class WalletComponent implements OnInit {
  searchText = '';

  // Login user id
  userId = localStorage.getItem('userId') || '';

  walletSummary = {
    balance: 0,
    credit: 0,
    debit: 0,
    monthly: 0,
  };

  transactions: any[] = [];

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.loadWallet();
    this.loadTransactions();
  }

  loadWallet() {
    if (!this.userId) return;

    this.walletService.getWallet(this.userId).subscribe({
      next: (res: any) => {
        this.walletSummary.balance = res.wallet.balance || 0;

        this.walletSummary.credit = res.wallet.credit || 0;

        this.walletSummary.debit = res.wallet.debit || 0;

        this.walletSummary.monthly = res.wallet.credit || 0;
      },
      error: (err:any) => {
        console.error(err);
      },
    });
  }

  loadTransactions() {
    if (!this.userId) return;

    this.walletService.getTransactions(this.userId).subscribe({
      next: (res: any) => {
        this.transactions = res.transactions || [];
      },
      error: (err:any) => {
        console.error(err);
      },
    });
  }

  get filteredTransactions() {
    return this.transactions.filter(
      (txn: any) =>
        txn.description?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        txn.id?.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  addCredit() {
    const amount = Number(prompt('Enter amount to add'));

    if (!amount || amount <= 0) {
      return;
    }

    this.walletService.addMoney(this.userId, amount).subscribe({
      next: () => {
        alert('Money Added Successfully');

        this.loadWallet();
        this.loadTransactions();
      },
      error: (err:any) => {
        alert(err?.error?.message || 'Something went wrong');
      },
    });
  }
}
