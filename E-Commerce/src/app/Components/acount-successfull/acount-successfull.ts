import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../core/services/accountRef.service'; // Path apne project ke hisaab se change karein
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-account-created',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acount-successfull.html',
  styleUrls: ['./acount-successfull.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountCreatedComponent implements OnInit {
  userName: string = '';
  referralCode: string = '';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAccountSuccessData();
  }

  getAccountSuccessData(): void {
    this.accountService.getAccountSuccessData().subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('Account Success Response:', res);
         console.log(res);
         console.log('Account Success Response:', res);
         console.log('Name:', res.data.name);
         console.log('Referral:', res.data.referralCode);

        console.log('Name:', res.data.name);
        console.log('Referral:', res.data.referralCode);

        if (res.success) {
          this.userName = res.data.name;
          this.referralCode = res.data.referralCode;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }

  copyCode(): void {
    if (!this.referralCode) return;

    navigator.clipboard.writeText(this.referralCode);
    alert('Referral code copied!');
  }

  exploreNow(): void {
    this.router.navigate(['/']);
  }

  shareReferral() {
     console.log('Share button clicked');
    const referralLink = `${window.location.origin}/register?ref=${this.referralCode}`;

    const message = `🎉 Join using my referral link\n\n${referralLink}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  }
}
