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
  orderId: string = '';

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
      customerPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
        console.log('Order created:', response);

        if (response.success && response.data) {
          this.orderId = response.data.order_id;
          this.successMessage = `Order created successfully! Order ID: ${this.orderId}`;
          this.paymentStatus = 'success';

          // Handle payment URL from Cashfree
          if (response.data.payment_link || response.data.cf_payment_url) {
            const paymentUrl = response.data.payment_link || response.data.cf_payment_url;
            setTimeout(() => {
              window.location.href = paymentUrl;
            }, 2000);
          }
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Payment error:', error);
        this.paymentStatus = 'error';
        this.errorMessage = error.error?.message || 'Payment failed. Please try again.';
        this.isLoading = false;
      },
    });
  }

  verifyPaymentStatus(): void {
    if (!this.orderId) {
      this.errorMessage = 'No order ID found';
      return;
    }

    this.isLoading = true;
    this.paymentService.verifyOrder(this.orderId).subscribe({
      next: (response: any) => {
        console.log('Verification response:', response);
        this.isLoading = false;

        if (response.success || response.data) {
          this.successMessage = 'Payment verified successfully!';
          this.paymentStatus = 'success';
          setTimeout(() => {
            this.router.navigate(['/orders']);
          }, 2000);
        }
      },
      error: (error: any) => {
        console.error('Verification error:', error);
        this.paymentStatus = 'error';
        this.errorMessage = error.error?.message || 'Verification failed';
        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    this.paymentForm.reset();
    this.paymentStatus = 'idle';
    this.errorMessage = '';
    this.successMessage = '';
    this.orderId = '';
  }
}
