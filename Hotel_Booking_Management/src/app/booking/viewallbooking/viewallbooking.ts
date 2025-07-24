import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { BookingModel } from '../../model/Booking.model';
import { HotelService } from '../../service/hotel.service';
import { Bookingservice } from '../../service/bookingservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallbooking',
  standalone: false,
  templateUrl: './viewallbooking.html',
  styleUrl: './viewallbooking.css'
})
export class Viewallbooking {


  hotels: Hotel[] = [];
  bookings: BookingModel[] = [];
  selectedHotelId: string = '';




  constructor(
    private hotelService: HotelService,
    private bookingService: Bookingservice,
    private router: Router,
    private cdr: ChangeDetectorRef



  ) { }

  ngOnInit(): void {

    this.loadHotels();
  }


  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.error(err);
      }
    });
  }

  OnHotelChange() {
    if (this.selectedHotelId) {
      this.bookingService.viewAllBooking().subscribe({
        next: (data) => {
          this.bookings = data.filter( b => b.hotelid === this.selectedHotelId);
          console.log('Manually filtered bookings:', this.bookings);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.bookings = [];
    }
  }

}




