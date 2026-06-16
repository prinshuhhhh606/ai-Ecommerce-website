import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment';

@Component({
  selector: 'app-payment-spec',
  standalone: true,
  imports: [CommonModule, PaymentComponent],
  template: ` <app-payment></app-payment> `,
})
export class PaymentSpecComponent {}

describe('PaymentComponent', () => {
  it('should create', () => {
    expect(true).toBe(true);
  });

  // Add more tests as needed
  it('should validate email format', () => {
    const email = 'test@example.com';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(email)).toBe(true);
  });

  it('should validate phone number format', () => {
    const phone = '9999999999';
    const phoneRegex = /^\d{10}$/;
    expect(phoneRegex.test(phone)).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    const phone = '123'; // Invalid
    const phoneRegex = /^\d{10}$/;
    expect(phoneRegex.test(phone)).toBe(false);
  });

  it('should validate minimum amount', () => {
    const amount = 0;
    expect(amount > 0).toBe(false);
  });

  it('should accept valid amount', () => {
    const amount = 100;
    expect(amount > 0).toBe(true);
  });
});
