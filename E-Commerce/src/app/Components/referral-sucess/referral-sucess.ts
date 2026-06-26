import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referral-shared-success',
  standalone: true,
  templateUrl: './referral-sucess.html',
  styleUrls: ['./referral-sucess.css'],
})
export class ReferralSharedSuccessComponent {
  referralCode = 'PRINCE2024';

  constructor(private router: Router) {}

  exploreNow() {
    this.router.navigate(['/']);
  }

  trackReferrals() {
    this.router.navigate(['/my-referrals']);
  }

  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    alert('Referral code copied!');
  }
}
