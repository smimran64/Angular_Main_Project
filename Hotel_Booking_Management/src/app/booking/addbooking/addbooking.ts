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
  // Default value for booked rooms
  room: RoomModel | null = null;
  selectedRoom!: RoomModel;



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
        this.selectedRoom = room; // ✅ eta add koro!
        this.room = room;

        this.booking.roomType = room.roomType;
        this.booking.bookedRooms = 1; // default 1 room select
        this.booking.adults = room.adults;
        this.booking.children = room.children;
        this.booking.roomimage = room.image;
        this.roomPrice = room.price;
        this.booking.totalAmount = room.price;

        this.loadHotelDetails(room.hotelId);
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  loadHotelDetails(hotelId: string): void {
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel: Hotel) => {
        console.log('Hotel:', hotel);
        this.booking.hotelName = hotel.name;
        this.booking.hotelId = hotel.id;



        this.loadLocationDetails(hotel.locationId);
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
      this.booking.userId = this.user.id;
    }
  }


  checkAvailability(roomId: string, requestedRooms: number): void {
    this.bookingService.getBookingsByRoomId(roomId).subscribe(bookings => {
      const totalBooked = bookings.reduce((sum, b) => sum + (b.bookedRooms || 0), 0);
      const available = this.room?.totalRooms! - totalBooked;

      if (requestedRooms > available) {
        alert(`Only ${available} rooms are available for this room type.`);
      } else {
        this.submitBooking(); // proceed if enough rooms
      }
    });
  }


  submitBooking(): void {
    if (!this.booking.contractPersonName || !this.booking.cell || !this.booking.checkin || !this.booking.checkout) {
      alert('Please fill the all required fields!');
      return;
    }

    if (!this.room) {
      alert('Room info not loaded.');
      return;
    }

    // First, check how many rooms are already booked
    this.bookingService.getBookingsByRoomId(this.room.id).subscribe(bookings => {
      const alreadyBooked = bookings.reduce((sum, b) => sum + (b.bookedRooms || 0), 0);
      const totalRooms = this.room!.totalRooms || 0;
      const availableRooms = totalRooms - alreadyBooked;

      const requestedRooms = this.booking.bookedRooms || 0;

      if (requestedRooms > availableRooms) {
        alert(`Only ${availableRooms} rooms are available. Please adjust your booking.`);
        return;
      }

      // If all good, calculate due and proceed
      this.calculateDueAmount();

      this.bookingService.createBooking(this.booking).subscribe({
        next: (response) => {
          console.log('Booking saved successfully:', response);
          // save notification + generate pdf
          // ...
          const notifications = this.localStorageService.getItem('bookingNotifications') || [];

        notifications.push({

          contractPerson: this.booking.contractPersonName,
          hotelName: this.booking.hotelName,
          location: this.booking.location,
          userId: this.booking.userId,
          totalAmount: this.booking.totalAmount,
          time: new Date().toLocaleString()
        });


        this.localStorageService.setItem('bookingNotifications', notifications);

         this.generateBookingPDF();
        },
        error: (err) => {
          console.error('Error saving booking:', err);
          alert('Booking Cannot Completed');
        }
      });
    });
  }




  // submitBooking(): void {
  //   // justify the form
  //   if (!this.booking.contractPersonName || !this.booking.cell || !this.booking.checkin || !this.booking.checkout) {
  //     alert('Please fill the all required field!');
  //     return;
  //   }

  //   // to calculate due amount
  //   this.calculateDueAmount();

  //   console.log('Booking to save:', this.booking);

  //   // to booking service
  //   this.bookingService.createBooking(this.booking).subscribe({
  //     next: (response) => {
  //       console.log('Booking saved successfully:', response);

  //       // ✅ Notification localStorage 
  //       const notifications = this.localStorageService.getItem('bookingNotifications') || [];

  //       notifications.push({

  //         contractPerson: this.booking.contractPersonName,
  //         hotelName: this.booking.hotelName,
  //         location: this.booking.location,
  //         userId: this.booking.userId,
  //         totalAmount: this.booking.totalAmount,
  //         time: new Date().toLocaleString()
  //       });


  //       this.localStorageService.setItem('bookingNotifications', notifications);

  //       this.generateBookingPDF();


  //       // 🔸 redirect user
  //       //   this.router.navigate(['bookingpdf']);
  //     },
  //     error: (err) => {
  //       console.error('Error saving booking:', err);
  //       alert('Booking Cannot Completed');
  //     }
  //   });
  // }




  // Calculate Total Amount by Date 

  calculateTotalAmount(): void {
    // 1️⃣ Check if check-in and check-out are valid
    if (!this.booking.checkin || !this.booking.checkout) {
      this.booking.totalAmount = 0;
      return;
    }

    const checkinDate = new Date(this.booking.checkin);
    const checkoutDate = new Date(this.booking.checkout);

    // 2️⃣ Calculate date difference
    const diffTime = checkoutDate.getTime() - checkinDate.getTime();

    if (diffTime <= 0) {
      this.booking.totalAmount = 0;
      return;
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 3️⃣ Handle booked rooms safely (min 1 room)
    let rooms = Number(this.booking.bookedRooms);
    if (isNaN(rooms) || rooms <= 0) {
      rooms = 0;
      this.booking.bookedRooms = 0; // also reset in model
    }

    // 4️⃣ Calculate totalAmount
    this.booking.totalAmount = diffDays * this.roomPrice * rooms;

    // 5️⃣ Trigger view update
    this.cdr.markForCheck();

    console.log(`🛏️ Days: ${diffDays}, Rooms: ${rooms}, Total: ${this.booking.totalAmount}`);
  }




  calculateDueAmount(): void {
    const total = this.booking.totalAmount || 0;
    const advance = this.booking.advanceAmount || 0;

    const due = total - advance;

    this.booking.dueAmount = due >= 0 ? due : 0;

    console.log(`Total: ${total}, Advance: ${advance}, Due: ${this.booking.dueAmount}`);
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
