import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/orderModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        console.log('ORDERS =>', res);
        console.log('COUNT =>', res.length);

        this.orders = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('GET ORDERS ERROR =>', err);
      },
    });
  }
}
