import { ChangeDetectorRef, Component } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';

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

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.loadHotelDetails(hotelId);
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

  loadRoomsForHotel(hotelId: string): void {
    this.roomService.getAllRoom().subscribe({
      next: (rooms: RoomModel[]) => {  // Specify type here
        this.rooms = rooms.filter(room => room.hotel === hotelId);
        this.loading = false;
         this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading rooms', err);
        this.rooms = [];
        this.loading = false;
      }
    });
  }


}
