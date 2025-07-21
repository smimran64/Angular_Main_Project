import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { BookingModel } from '../../model/Booking.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { Bookingservice } from '../../service/bookingservice';
import { UserprofileService } from '../../service/userprofile.service';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { LocalStorageService } from '../../service/localstorage.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-addbooking',
  standalone: false,
  templateUrl: './addbooking.html',
  styleUrl: './addbooking.css'
})
export class Addbooking {

  user: User | null = null;
  booking: BookingModel = new BookingModel();
  loading = true;
  roomPrice = 0; // Add this to your class



  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private locationService: LocationService,
    private bookingService: Bookingservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userAuthService: AuthService,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit(): void {
    this.loadUserDetails();
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
        this.booking.roomimage = room.image;

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
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading location', err);
        this.loading = false;
      }
    });
  }

  loadUserDetails(): void {
    this.user = this.userAuthService.getUserProfileFromStorage();
    if (this.user) {
      this.booking.userid = this.user.id;
    }
  }



  submitBooking(): void {
    // justify the form
    if (!this.booking.contractpersonname || !this.booking.cell || !this.booking.checkin || !this.booking.checkout) {
      alert('Please fill the all required field!');
      return;
    }

    // to calculate due amount
    this.calculateDueAmount();

    console.log('Booking to save:', this.booking);

    // to booking service
    this.bookingService.createBooking(this.booking).subscribe({
      next: (response) => {
        console.log('Booking saved successfully:', response);

        // ✅ Notification localStorage 
        const notifications = this.localStorageService.getItem('bookingNotifications') || [];

        notifications.push({

          contractPerson: this.booking.contractpersonname,
          hotelName: this.booking.hotelname,
          location: this.booking.location,
          userId: this.booking.userid,
          totalAmount: this.booking.totalamount,
          time: new Date().toLocaleString()
        });


        this.localStorageService.setItem('bookingNotifications', notifications);

         this.generateBookingPDF();


        // 🔸 redirect user
     //   this.router.navigate(['bookingpdf']);
      },
      error: (err) => {
        console.error('Error saving booking:', err);
        alert('Booking Cannot Completed');
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

  

  generateBookingPDF(): void {
  const element = this.pdfContent.nativeElement;

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    // Debug base64 prefix
    console.log('Image data starts with:', imgData.slice(0, 30)); // should be "data:image/png;base64"

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('booking-details.pdf');
  }).catch(error => {
    console.error('Error generating canvas:', error);
  });
}




}
