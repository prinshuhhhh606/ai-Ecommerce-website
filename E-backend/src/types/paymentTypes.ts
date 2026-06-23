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

export interface PaymentRequest {
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
