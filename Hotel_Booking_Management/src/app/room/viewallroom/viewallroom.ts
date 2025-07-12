import { Component } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-viewallroom',
  standalone: false,
  templateUrl: './viewallroom.html',
  styleUrl: './viewallroom.css'
})
export class Viewallroom {


  hotels: Hotel[] = [];
  rooms: RoomModel[] = [];
  selectedHotelId: string = '';

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => this.hotels = data,
      error: (err) => console.error(err)
    });
  }

  onHotelChange() {
    if (this.selectedHotelId) {
      this.roomService.getRoomsByHotelId(this.selectedHotelId).subscribe({
        next: (data) => this.rooms = data,
        error: (err) => console.error(err)
      });
    } else {
      this.rooms = [];
    }
  }

}
