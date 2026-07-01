import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get(this.apiUrl);
  }

  markAsRead(id: string) {
    return this.http.put(`${this.apiUrl}/${id}/read`, {});
  }

  markAllRead() {
    return this.http.put(`${this.apiUrl}/read-all`, {});
  }
}
