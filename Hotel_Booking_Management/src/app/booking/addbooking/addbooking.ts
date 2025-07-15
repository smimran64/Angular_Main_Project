import { Component } from '@angular/core';
import { BookingModel } from '../../model/Booking.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { Bookingservice } from '../../service/bookingservice';

@Component({
  selector: 'app-addbooking',
  standalone: false,
  templateUrl: './addbooking.html',
  styleUrl: './addbooking.css'
})
export class Addbooking {

  booking: BookingModel = new BookingModel();
  loading = true;
  roomPrice = 0; // Add this to your class

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private locationService: LocationService,
    private bookingService: Bookingservice,
    private router:Router
  ) { }


  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.loadRoomDetails(roomId);
    } else {
      console.error('Room ID not provided!');
      this.loading = false;
    }
  }

  loadRoomDetails(roomId: string): void {
    this.roomService.getRoomById(roomId).subscribe({
      next: (room: RoomModel) => {
        this.booking.roomtype = room.roomtype;
        this.booking.adults = room.adults;
        this.booking.children = room.children;

        this.roomPrice = room.price; // Store price separately
        this.booking.totalamount = room.price; // Default for 1 night

        this.loadHotelDetails(room.hotel);
      },

    });
  }

  loadHotelDetails(hotelId: string): void {
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel: Hotel) => {
        console.log('Hotel:', hotel);
        this.booking.hotelname = hotel.name;

        this.loadLocationDetails(hotel.location);
      },
      error: (err) => {
        console.error('Error loading hotel', err);
        this.loading = false;
      }
    });
  }

  loadLocationDetails(locationId: string): void {
    this.locationService.getLocationById(locationId).subscribe({
      next: (location: Location) => {
        console.log('Location:', location);
        this.booking.location = location.locationName;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading location', err);
        this.loading = false;
      }
    });
  }



  submitBooking(): void {
    // Optional: simple validation
    if (!this.booking.contractpersonname || !this.booking.cell || !this.booking.checkin || !this.booking.checkout) {
      alert('Please fill all required fields!');
      return;
    }

    // Calculate due amount again just to be safe
    this.calculateDueAmount();

    console.log('Booking to save:', this.booking);

    // Call your booking service to save the booking
    this.bookingService.createBooking(this.booking).subscribe({
      next: (response) => {
        console.log('Booking saved successfully:', response);
        alert('Booking confirmed!');
        // Optionally, navigate to a confirmation page
        this.router.navigate(['/booking-success']);
      },
      error: (err) => {
        console.error('Error saving booking:', err);
        alert('Failed to save booking. Please try again.');
      }
    });
  }



  // Calculate Total Amount by Date 

  calculateTotalAmount(): void {
    if (this.booking.checkin && this.booking.checkout) {
      const checkinDate = new Date(this.booking.checkin);
      const checkoutDate = new Date(this.booking.checkout);

      const diffTime = checkoutDate.getTime() - checkinDate.getTime();

      if (diffTime < 0) {
        this.booking.totalamount = 0;
        return;
      }

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.booking.totalamount = diffDays * this.roomPrice;

      console.log(`Nights: ${diffDays}, Total: ${this.booking.totalamount}`);
    } else {
      this.booking.totalamount = 0;
    }
  }


  calculateDueAmount(): void {
    const total = this.booking.totalamount || 0;
    const advance = this.booking.advanceamount || 0;

    const due = total - advance;

    this.booking.dueamount = due >= 0 ? due : 0;

    console.log(`Total: ${total}, Advance: ${advance}, Due: ${this.booking.dueamount}`);
  }





}
