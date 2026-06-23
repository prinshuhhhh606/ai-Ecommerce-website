import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminDashboardComponent {
  adminMenus = [
    {
      title: 'Orders',
      icon: '📦',
      route: '/admin/orders',
    },
    {
      title: 'Users',
      icon: '👥',
      route: '/admin/users',
    },
    {
      title: 'Categories',
      icon: '🗂️',
      route: '/admin/categories',
    },
    {
      title: 'Payments',
      icon: '💳',
      route: '/admin/payments',
    },
    {
      title: 'Earnings',
      icon: '🏦',
      route: '/admin/earnings',
    },
    {
      title: 'Reports',
      icon: '📊',
      route: '/admin/reports',
    },
  ];
  
  showAdminMenu = false;

  toggleAdminMenu(): void {
    this.showAdminMenu = !this.showAdminMenu;
  }
}
