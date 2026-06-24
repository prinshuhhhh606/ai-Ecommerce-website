import { Component } from '@angular/core';

@Component({
  selector: 'app-referral',
  standalone: true,
  templateUrl: './referral.html',
  styleUrls: ['./referral.css'],
})
export class ReferralComponent {
  referrals = [];

  constructor() {}
}
