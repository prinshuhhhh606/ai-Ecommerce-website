import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.http.get('http://localhost:5000/api/admin/dashboard').subscribe({
      next: (res: any) => {
        this.dashboardData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
