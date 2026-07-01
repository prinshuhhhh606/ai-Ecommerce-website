import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.services';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css'],
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.notifications;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  markAsRead(notification: any) {
    this.notificationService.markAsRead(notification._id).subscribe(() => {
      notification.read = true;
    });
  }
  markAllRead(): void {
    this.notificationService.markAllRead().subscribe({
      next: () => {
        this.notifications.forEach((notification: any) => {
          notification.read = true;
        });
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
