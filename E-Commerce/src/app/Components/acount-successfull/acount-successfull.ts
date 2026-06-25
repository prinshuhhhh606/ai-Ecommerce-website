import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acount-successfull.html',
  styleUrls: ['./acount-successfull.css'],
})
export class AccountCreatedComponent {
  referralCode = 'SHOP123';

  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    alert('Referral code copied!');
  }

  exploreNow() {
    console.log('Navigate to Home');
  }

  shareReferral() {
    console.log('Share Referral');
  }
}
