import { Component } from '@angular/core';
import { LocalStorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-bookingalert',
  standalone: false,
  templateUrl: './bookingalert.html',
  styleUrl: './bookingalert.css'
})
export class Bookingalert {


  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.notifications = this.localStorageService.getItem('bookingNotifications') || [];
      // 🔴 Count unread notifications
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  clearNotifications() {
    localStorage.removeItem('bookingNotifications');
    this.notifications = [];
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.localStorageService.setItem('bookingNotifications', this.notifications);
    this.unreadCount = 0;
  }
}




