import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  referralApplied: boolean = false;
  referralMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    referralCode: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const ref = params['ref'];

      if (ref) {
        // IMPORTANT: use setValue for disabled control
        this.registerForm.get('referralCode')?.setValue(ref);

        console.log('Referral Code:', ref);
      }
    });
  }

  register() {
    // IMPORTANT: use getRawValue() to include disabled fields
    const formData = this.registerForm.getRawValue();

    console.log('FORM DATA =>', formData);

    this.authService.register(formData).subscribe({
      next: (res: any) => {
        console.log('REGISTER SUCCESS =>', res);

        this.authService.saveToken(res.token);

        this.router.navigate(['/account-created']);
      },

      error: (err) => {
        console.log('FULL ERROR =>', err);
      },
    });
  }

  applyReferral() {
    const code = this.registerForm.get('referralCode')?.value?.trim();

    console.log('Referral Code:', code);

    if (!code) {
      this.referralApplied = false;
      this.referralMessage = '';
      return;
    }

    this.authService.verifyReferral(code).subscribe({
      next: (res: any) => {
        this.referralApplied = true;
        this.referralMessage = res.message;
      },
      error: (err) => {
        this.referralApplied = false;
        this.referralMessage = err.error.message;
      },
    });
  }
}
