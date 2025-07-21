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

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.notifications = this.localStorageService.getItem('bookingNotifications') || [];
  }

  clearNotifications() {
    localStorage.removeItem('bookingNotifications');
    this.notifications = [];
  }
}



