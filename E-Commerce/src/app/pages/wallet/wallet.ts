import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { WalletService } from '../../core/services/wallet.services';
import { PaymentService } from '../../core/services/paymentServices';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  searchText = '';
  userId: string = '';

  showPopup = false;
  amount: number = 0;
  isProcessing = false;
  loadingWallet = false;

  walletSummary = {
    balance: 0,
    credit: 0,
    debit: 0,
    monthly: 0,
  };

  transactions: any[] = [];

  constructor(
    private walletService: WalletService,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
  ) {}

  // ================= INIT =================
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    console.log('INIT USER ID =>', this.userId);

    if (this.userId) {
      this.loadWallet();
      this.loadTransactions();
    }
  }

  // ================= LOAD WALLET =================
  loadWallet(callback?: () => void) {
    if (!this.userId) return;

    this.loadingWallet = true;

    this.walletService.getWallet(this.userId).subscribe({
      next: (res: any) => {
        console.log('LOAD WALLET RESPONSE =>', res);

        const wallet = res?.wallet || {};

        // ✅ FIX 1: Correctly map balance from API response
        this.walletSummary = {
          balance: wallet?.balance ?? 0,
          credit: wallet?.totalCredit ?? wallet?.credit ?? 0,
          debit: wallet?.totalDebit ?? wallet?.debit ?? 0,
          monthly: wallet?.monthlyCredit ?? wallet?.credit ?? 0,
        };

        console.log('Wallet Summary Updated =>', this.walletSummary);

        this.loadingWallet = false;

        // ✅ FIX 2: Execute callback after wallet is loaded
        if (callback) callback();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('WALLET LOAD ERROR =>', err);

        this.walletSummary = {
          balance: 0,
          credit: 0,
          debit: 0,
          monthly: 0,
        };

        this.loadingWallet = false;

        if (callback) callback();
      },
    });
  }

  // ================= LOAD TRANSACTIONS =================
  loadTransactions() {
    if (!this.userId) return;

    this.walletService.getTransactions(this.userId).subscribe({
      next: (res: any) => {
        this.transactions = res?.transactions || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('TRANSACTIONS ERROR =>', err),
    });
  }

  // ================= FILTER =================
  get filteredTransactions() {
    return this.transactions.filter(
      (txn: any) =>
        txn?.description?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        txn?.id?.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  // ================= POPUP =================
  openPopup() {
    this.amount = 0;
    this.showPopup = true;
  }

  closePopup() {
    if (this.isProcessing) return;

    this.showPopup = false;
    this.amount = 0;
  }

  // ================= REFRESH =================
  refreshWallet() {
    this.loadWallet();
    this.loadTransactions();
  }

  // ================= ADD MONEY =================
  addCredit() {
    if (this.isProcessing) return;

    this.userId = localStorage.getItem('userId') || '';

    if (!this.userId) {
      alert('User ID not found');
      return;
    }

    if (!this.amount || this.amount <= 0) {
      alert('Enter valid amount');
      return;
    }

    this.isProcessing = true;
    console.log('Add Money Started');

    // STEP 1: PAYMENT
    this.paymentService.walletPayment(this.amount).subscribe({
      next: (payment: any) => {
        if (!payment?.success || payment?.status !== 'SUCCESS') {
          alert('Payment Failed');
          this.isProcessing = false;
          return;
        }

        // STEP 2: ADD TO WALLET
        this.walletService.addMoney(this.userId, this.amount, payment.status).subscribe({
          next: (res: any) => {
            console.log('Wallet Updated =>', res);

            this.amount = 0;
            this.isProcessing = false;

            // ✅ FIX 4: Close popup FIRST, then refresh wallet & transactions
            this.showPopup = false;

            // ✅ FIX 5: Reload wallet with latest balance after popup closes
            this.loadWallet();
            this.loadTransactions();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Wallet Error =>', err);
            this.isProcessing = false;
            alert('Failed to update wallet. Please try again.');
          },
        });
      },
      error: (err) => {
        console.error('Payment Error =>', err);
        this.isProcessing = false;
        alert('Payment failed. Please try again.');
      },
    });
  }
}
