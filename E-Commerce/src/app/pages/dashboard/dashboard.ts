import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};

  constructor(private http: HttpClient,private cd : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.http.get(`${environment.apiUrl}/api/orders/earnings`).subscribe({
      next: (res: any) => {
        console.log('DASHBOARD RESPONSE =>', res);
        this.dashboardData = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
