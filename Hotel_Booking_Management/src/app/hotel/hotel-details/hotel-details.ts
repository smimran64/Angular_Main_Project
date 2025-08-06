import { ChangeDetectorRef, Component } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { LocationService } from '../../service/location.service';
import { Bookingservice } from '../../service/bookingservice';
import { BookingModel } from '../../model/Booking.model';
import { HotelCridentialService } from '../../service/hotel-cridential-service';
import { HotelBasicInfo } from '../../hotelCridentials/hotel-basic-info/hotel-basic-info';
import { HotelMediaService } from '../../service/hotel-media.service';
import { HotelMedia } from '../../model/hotelMedia.model';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-hotel-details',
  standalone: false,
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.css'
})
export class HotelDetails {

  hotel!: Hotel | null;
  rooms: RoomModel[] = [];
  loading = true;
  hotelCridential: any;
  hotelBasicInfo: HotelBasicInfo[] = [];
  hotelMedia: HotelMedia | null = null;
  locationMap: { [key: string]: string } = {};
  locations: Location[] = [];
  locationName: string = '';


  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private bookingService: Bookingservice,
    private hotelCridentialService: HotelCridentialService,
    private hotelMediaService: HotelMediaService,
    private locationService: LocationService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['refresh']) {
      const hotelId = this.route.snapshot.paramMap.get('id');
      if (hotelId) {
        this.loadRoomsForHotel(hotelId);
      }
    }
  }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.loadHotelDetails(hotelId);
      this.loadHotelCridentials(hotelId);
      this.loadHotelMedia(hotelId);
      this.loadAllLocations();
    } else {
      this.loading = false;
      this.hotel = null;
    }

  }

  loadHotelDetails(id: string): void {
    this.hotelService.getHotelById(id).subscribe({
      next: (hotel) => {
        this.hotel = hotel;
        this.loadRoomsForHotel(hotel.id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotel', err);
        this.hotel = null;
        this.loading = false;
      }
    });
  }


  loadAllLocations(): void {
    this.locationService.getAllLocation().subscribe({
      next: (locs) => {
        this.locations = locs;

        // Try setting location name if hotel is already loaded
        if (this.hotel) {
          this.setLocationName(this.hotel.locationId);
        }
      },
      error: (err) => {
        console.error('Error loading locations:', err);
        this.locations = [];
      }
    });
  }



  setLocationName(locationId: string): void {
    const matched = this.locations.find(loc => loc.id === locationId);
    this.locationName = matched ? matched.locationName : 'Unknown';
  }




  loadRoomsForHotel(hotelId: string): void {
    this.roomService.getAllRoom().subscribe({
      next: (rooms: RoomModel[]) => {
        const filteredRooms = rooms.filter(room => room.hotelId === hotelId);

        this.bookingService.getAllBookings().subscribe((bookings: BookingModel[]) => {
          const hotelBookings = bookings.filter(b => b.hotelId === hotelId);

          this.rooms = filteredRooms.map(room => {
            const totalBooked = hotelBookings
              .filter(b => b.roomId === room.id)
              .reduce((sum, b) => sum + (b.bookedRooms || 0), 0);

            return {
              ...room,
              bookedRooms: totalBooked,
              availableRooms: room.totalRooms - totalBooked
            };
          });

          this.loading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        console.error('Error loading rooms', err);
        this.rooms = [];
        this.loading = false;
      }
    });
  }


  // calculateRoomAvailability(): void {
  //   this.rooms.forEach(room => {
  //     this.bookingService.getBookingsByRoomId(room.id).subscribe(bookings => {
  //       const bookedCount = bookings.reduce((sum, b) => sum + (b.bookedRooms || 0), 0);
  //       room.bookedRooms = bookedCount;
  //       room.availableRooms = room.totalRooms - bookedCount;
  //       this.cdr.markForCheck();
  //     });
  //   });
  // }

  bookRoom(room: RoomModel): void {
    console.log('Booking room:', room);
    this.router.navigate(['/booking', room.id], {
      state: {
        hotelId: room.hotelId,
        roomPrice: room.price,
        totalRooms: room.totalRooms,
        availableRooms: room.availableRooms
      }

    });
  }

  // ✅ Availability Check Function
  isRoomAvailable(room: RoomModel): boolean {
    return (room.availableRooms || 0) > 0;
  }


  // Placeholder for hotel credentials loading
  loadHotelCridentials(hotelId: string): void {
    this.hotelCridentialService.getAllHotelCredentials().subscribe({
      next: (credentials: any[]) => { // 👈 use 'any[]' if type issue occurs
        const matchedCridentials = credentials.filter((info: any) => info.hotelId === hotelId);

        if (matchedCridentials.length > 0) {
          this.hotelBasicInfo = matchedCridentials;
          this.hotelCridential = matchedCridentials[0];
        } else {
          console.warn('No credentials found for hotel ID:', hotelId);
          this.hotelBasicInfo = [];
          this.hotelCridential = null;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotel credentials', err);
        this.hotelBasicInfo = [];
        this.hotelCridential = null;
      }
    });
  }

  loadHotelMedia(hotelId: string): void {
    this.hotelMediaService.getAllMedia().subscribe({
      next: (mediaList: HotelMedia[]) => {
        const found = mediaList.find((media) => media.hotelId === hotelId);
        if (found) {
          this.hotelMedia = found;
        } else {
          this.hotelMedia = null;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotel media:', err);
        this.hotelMedia = null;
      }
    });
  }






}



