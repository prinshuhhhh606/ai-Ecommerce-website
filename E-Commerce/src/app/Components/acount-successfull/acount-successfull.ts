import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acount-successfull.html',
  styleUrls: ['./acount-successfull.css'],
})
export class AccountCreatedComponent {
  referralCode = 'SHOP123';

  constructor(private router:Router){

  }
  copyCode() {
    navigator.clipboard.writeText(this.referralCode);
    alert('Referral code copied!');
  }

  exploreNow() {
    console.log('Navigate to Home');
    this.router.navigate(['/']);
  }

  shareReferral() {
    console.log('Share Referral');
     this.router.navigate(['/referral-success']);

  }
}
