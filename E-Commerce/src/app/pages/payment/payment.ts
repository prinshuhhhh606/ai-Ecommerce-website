
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/paymentServices';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  isLoading = false;

  paymentStatus: 'idle' | 'processing' | 'success' | 'error' = 'idle';

  errorMessage = '';
  successMessage = '';

  paymentId = '';

  developerAmount = 0;
  shopkeeperAmount = 0;
  totalAmount = 0;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
    });
  }

  processPayment(): void {
    if (this.paymentForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    this.isLoading = true;
    this.paymentStatus = 'processing';
    this.errorMessage = '';
    this.successMessage = '';

    const amount = this.paymentForm.get('amount')?.value;

    const customerData = {
      name: this.paymentForm.get('customerName')?.value,
      email: this.paymentForm.get('customerEmail')?.value,
      phone: this.paymentForm.get('customerPhone')?.value,
    };

    this.paymentService.createOrder(amount, customerData).subscribe({
      next: (response: any) => {
        console.log('PAYMENT RESPONSE =>', response);

        if (response.success) {
          this.paymentId = response.paymentId;

          this.totalAmount = response.amount;
          this.developerAmount = response.developerAmount;
          this.shopkeeperAmount = response.shopkeeperAmount;

          this.successMessage =
            'Payment Successful! Payment ID: ' + response.paymentId;

          this.paymentStatus = 'success';

          console.log('Total Payment:', response.amount);
          console.log('Developer Gets:', response.developerAmount);
          console.log('Shopkeeper Gets:', response.shopkeeperAmount);
        }

        this.isLoading = false;
      },

      error: (error: any) => {
        console.error('Payment Error:', error);

        this.paymentStatus = 'error';
        this.errorMessage =
          error.error?.message || 'Payment failed. Please try again.';

        this.isLoading = false;
      },
    });
  }

  verifyPaymentStatus(): void {
    if (!this.paymentId) {
      this.errorMessage = 'No Payment ID found';
      return;
    }

    this.isLoading = true;

    this.paymentService.verifyOrder(this.paymentId).subscribe({
      next: (response: any) => {
        console.log('Verification Response:', response);

        this.isLoading = false;

        if (response.success) {
          this.successMessage = 'Payment verified successfully!';
          this.paymentStatus = 'success';
        }
      },

      error: (error: any) => {
        console.error('Verification Error:', error);

        this.paymentStatus = 'error';
        this.errorMessage =
          error.error?.message || 'Verification failed';

        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    this.paymentForm.reset();

    this.paymentStatus = 'idle';
    this.errorMessage = '';
    this.successMessage = '';

    this.paymentId = '';

    this.totalAmount = 0;
    this.developerAmount = 0;
    this.shopkeeperAmount = 0;
  }
}
