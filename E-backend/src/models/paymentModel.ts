export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  CARD = "CARD",
  UPI = "UPI",
  NET_BANKING = "NET_BANKING",
  COD = "COD",
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

export interface PaymentRequest {
  productId: number;
  productName: string;
  amount: number;

  customerName: string;
  customerEmail: string;

  paymentMethod: PaymentMethod;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  status: PaymentStatus;
  amount: number;
  transactionDate: Date;
  message: string;
}

export interface Payment {
  paymentId: string;
  amount: number;
  paymentMethod: PaymentMethod;

  customerName: string;
  customerEmail: string;

  status: PaymentStatus;

  createdAt: Date;
}

export interface Transaction {
  paymentId: string;

  productId: number;
  productName: string;

  amount: number;

  customerName: string;
  customerEmail: string;

  paymentMethod: PaymentMethod;

  status: PaymentStatus;

  createdAt: Date;
}
