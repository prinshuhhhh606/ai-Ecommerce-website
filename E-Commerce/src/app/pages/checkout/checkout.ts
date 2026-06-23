import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/paymentServices';
import { CartService } from '../../core/services/cart.services';
import { OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class CheckoutComponent {
  totalAmount = 0;
  cartItems: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();

    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price, 0);

    console.log('Cart Items:', this.cartItems);
    console.log('Total Amount:', this.totalAmount);
  }

  payNow() {
    const customer = {
      name: 'Prashant',
      email: 'test@gmail.com',
      phone: '9876543210',
    };

 console.log('https://ai-ecommerce-website-2yam.onrender.com/api/payment/create-payment');
    this.paymentService.createOrder(this.totalAmount, customer).subscribe({
      next: (response: any) => {
        console.log('PAYMENT RESPONSE =>', response);
        // 👇 YAHAN ADD KARO
        console.log('💰 Total Payment:', response.amount);
        console.log('👨‍💻 Developer Gets:', response.developerAmount);
        console.log('🏪 Shopkeeper Gets:', response.shopkeeperAmount);
        console.log('FULL RESPONSE =>', response);

   
        const orderData = {
          userId: 'USER_001', // temporary user id

          totalAmount: this.totalAmount,
          platformCommission: response.developerAmount,
          shopkeeperAmount: response.shopkeeperAmount,

          status: 'Pending',

          items: this.cartItems.map((item) => ({
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            category: item.category,
            quantity: item.quantity || 1,
          })),
        };

        console.log('ORDER DATA =>', orderData);
        this.orderService.placeOrder(orderData as any).subscribe({
          next: (savedOrder: any) => {
            console.log('ORDER SAVED =>', savedOrder);

            this.router.navigate(['/order-success'], {
              queryParams: {
                orderId: savedOrder._id,
                paymentId: response.paymentId,
              },
            });
          },

          error: (err) => {
            console.log('FULL ERROR =>', err);
            console.log('STATUS =>', err.status);
            console.log('BACKEND RESPONSE =>', JSON.stringify(err.error, null, 2));
          },
        });
      },

      error: (error) => {
        console.error('Payment Error =>', error);
      },
    });
  }
}
