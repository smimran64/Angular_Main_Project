import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { HoteladminprofileService } from '../../service/hoteladminprofile.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoteladminprofile',
  standalone: false,
  templateUrl: './hoteladminprofile.html',
  styleUrl: './hoteladminprofile.css'
})
export class Hoteladminprofile implements OnInit, OnDestroy {

  user: User | null = null;
  userHotels: Hotel[] = [];
  private subscription = new Subscription();


  constructor(
    private hotelAdminProfileService: HoteladminprofileService,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.loadHoteladminProfile();
  }
  loadHoteladminProfile(): void {
    const subUser = this.hotelAdminProfileService.getHotelAdminProfile().subscribe({
      next: (res) => {
        this.user = res;
        if (this.user) {
          this.loadHotelsByUserId(this.user.id);
        }
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
    this.subscription.add(subUser);
  }

  loadUserHotels(userId: string): void {
    const subBooking = this.hotelService.getHotelByUserId(userId).subscribe({
      next: (hotels) => {
        this.userHotels = hotels;
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

  loadHotelsByUserId(id: string): void {
    this.hotelService.getHotelByUserId(id).subscribe(data => {
      this.userHotels = data;
      console.log(this.userHotels);
      this.cdr.markForCheck();
    });
  }

}
