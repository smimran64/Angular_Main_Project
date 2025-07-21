import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { User } from '../../model/user.model';
import { BookingModel } from '../../model/Booking.model';
import { Subscription } from 'rxjs';
import { UserprofileService } from '../../service/userprofile.service';
import { Router } from '@angular/router';
import { Bookingservice } from '../../service/bookingservice';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrls: ['./userprofile.css']
})
export class Userprofile implements OnInit, OnDestroy {

  user: User | null = null;
  userBookings: BookingModel[] = [];
  private subscription = new Subscription();

  constructor(
    private userProfileService: UserprofileService,
    private bookingService: Bookingservice,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const subUser = this.userProfileService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res;
        if (this.user) {
          this.loadBookingsByUserId(this.user.id);
        }
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
    this.subscription.add(subUser);
  }

  loadUserBookings(userId: string): void {
    const subBooking = this.bookingService.getBookingsByUserId(userId).subscribe({
      next: (bookings) => {
        this.userBookings = bookings;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
    this.subscription.add(subBooking);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editProfile() {

    this.router.navigate(['/edit-profile']);
  }

  loadBookingsByUserId(id: string): void {
    this.bookingService.getBookingsByUserId(id).subscribe(data => {
      // DESC order (latest first) by check-in date
      this.userBookings = data.sort((a, b) =>
        new Date(b.checkin).getTime() - new Date(a.checkin).getTime()
      );
      console.log(this.userBookings);
      this.cdr.markForCheck();
    });
  }
}
