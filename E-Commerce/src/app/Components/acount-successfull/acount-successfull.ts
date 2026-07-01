import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/accountRef.service';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acount-successfull.html',
  styleUrls: ['./acount-successfull.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreatedComponent implements OnInit {
  userName = '';
  referralCode = '';

  // Reward
  rewardApplied = false;
  rewardAmount = 0;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    const state = history.state;

    const rewardAppliedStr = localStorage.getItem('rewardApplied');
    const rewardAmountStr = localStorage.getItem('rewardAmount');

    console.log('rewardAppliedStr:', rewardAppliedStr);
    console.log('rewardAmountStr:', rewardAmountStr);

    this.rewardApplied =
      state.rewardApplied ??
      (rewardAppliedStr && rewardAppliedStr !== 'undefined' ? JSON.parse(rewardAppliedStr) : false);

    this.rewardAmount =
      state.rewardAmount ??
      (rewardAmountStr && rewardAmountStr !== 'undefined' ? JSON.parse(rewardAmountStr) : 0);

    console.log('rewardApplied:', this.rewardApplied);
    console.log('rewardAmount:', this.rewardAmount);

    this.getAccountSuccessData();
  }
  getAccountSuccessData(): void {
    this.accountService.getAccountSuccessData().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.userName = res.data.name;
          this.referralCode = res.data.referralCode;
        }

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.referralCode);

    alert('Referral Code Copied Successfully');
  }

  exploreNow(): void {
    this.router.navigate(['/']);
  }

  goToWallet(): void {
    this.router.navigate(['/wallet']);
  }

  trackReferrals(): void {
    this.router.navigate(['/referral']);
  }

  shareReferral(): void {
    const code = this.referralCode || '';

    const referralLink = `${window.location.origin}/register?ref=${encodeURIComponent(code)}`;

    const message = `🎉 Join ShopEase using my referral link!

${referralLink}

Both of us will receive ₹50 after your successful signup.`;

    // safer check
    if (navigator.share) {
      navigator
        .share({
          title: 'ShopEase Referral',
          text: message,
          url: referralLink, // 🔥 better support on mobile
        })
        .catch((err) => {
          console.log('Share failed:', err);

          window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    }
  }
}
