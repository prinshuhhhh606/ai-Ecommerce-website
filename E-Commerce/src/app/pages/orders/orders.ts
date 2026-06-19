import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/orderModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  trackingSteps = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

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

        this.orders = Array.isArray(res) ? res : res.orders || [];

        console.log('COUNT =>', this.orders.length);

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('GET ORDERS ERROR =>', err);
        this.orders = [];
        this.cdr.markForCheck();
      },
    });
  }

  isStepActive(currentStatus: string, step: string): boolean {
    return this.trackingSteps.indexOf(currentStatus) >= this.trackingSteps.indexOf(step);
  }
}
