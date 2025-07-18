import { ChangeDetectorRef, Component } from '@angular/core';
import { RoomModel } from '../model/room.model';
import { HotelService } from '../service/hotel.service';
import { RoomService } from '../service/room.service';
import { LocationService } from '../service/location.service';
import { Hotel } from '../model/hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

   hotels: Hotel[] = [];
  rooms: RoomModel[] = [];
  locations: any[] = [];

  filteredHotels: Hotel[] = [];

  searchLocationId: string = '';
  searchGuests: number = 1;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private locationService: LocationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadHotels();
    this.loadRooms();
  }

  loadLocations() {
    this.locationService.getAllLocation().subscribe({
      next: (data) => (this.locations = data),
      error: (err) => console.error(err)
    });
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.filteredHotels = data;
      },
      error: (err) => console.error(err)
    });
  }

  loadRooms() {
    this.roomService.getAllRoom().subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (err) => console.error(err)
    });
  }

  searchHotels() {
    this.filteredHotels = this.hotels.filter((hotel) => {
      const locationMatch = this.searchLocationId
        ? hotel.location === this.searchLocationId
        : true;

      // Check if hotel has any room that fits guests
      const hasRoomForGuests = this.rooms.some(
        (room) =>
          room.hotel === hotel.id &&
          (room.adults + room.children) >= this.searchGuests
      );

      return locationMatch && hasRoomForGuests;
    });
  }

  viewHotel(hotel: Hotel) {
  this.router.navigate(['/hotel-details', hotel.id]);


}

}
