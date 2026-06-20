import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminDashboardComponent implements OnInit {
  earnings: any = {
    totalSales: 0,
    totalOrders: 0,
    totalCommission: 0,
    totalShopkeeperAmount: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.http.get('http://localhost:5000/api/orders/earnings').subscribe({
      next: (res: any) => {
        this.earnings = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
