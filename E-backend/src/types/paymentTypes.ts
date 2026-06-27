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

export interface PaymentItem {
  productId: string;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone?: string;
}

export interface PaymentRequest {
  items: PaymentItem[];

  customer: Customer;

  paymentMethod: PaymentMethod;

  // ✅ Coupon support added
  couponCode?: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  status: PaymentStatus;
  amount: number;
  transactionDate: Date;
  message: string;

  // ✅ extra backend calculation fields
  originalAmount?: number;
  discount?: number;
  couponCode?: string;
  developerAmount?: number;
  shopkeeperAmount?: number;
}
