import { ChangeDetectorRef, Component } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';

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
    private roomService: RoomService,
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

  onHotelChange() {
    if (this.selectedHotelId) {
      this.roomService.getRoomsByHotelId(this.selectedHotelId).subscribe({
        next: (data) => {
          this.rooms = data,
          this.cdr.markForCheck();
        },
        error: (err) => {

          console.error(err)

        }

      });

    }
    else {
      this.rooms = [];
    }

  }

  loadRoom(): void {

    this.roomService.getAllRoom().subscribe({

      next: (res) => {

        this.rooms = res;
        console.log('rooms', this.rooms);
        this.cdr.markForCheck();
      },
      error: (err) => {

        console.error('Error loading rooms', err);

      }


    })
  }

  deleteRoom(id: string): void {

    this.roomService.deleteRoom(id).subscribe({
      next: (res) => {

        console.log('Room Successfully deleted');
        this.loadRoom();
        this.cdr.markForCheck();
        this.cdr.reattach();

      },

      error: (err) => {

        console.log('delete Unsuccessfull', err);
      }

    })
  }

  getRoomById(id: string): void {

    this.roomService.getRoomById(id).subscribe({
      next: (res) => {

        console.log(res);
        this.router.navigate(['updateroom', id])
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

}
