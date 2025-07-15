import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-updateroom',
  standalone: false,
  templateUrl: './updateroom.html',
  styleUrl: './updateroom.css'
})
export class Updateroom implements OnInit {

  id: string = '';
  room: RoomModel = new RoomModel();
  hotels: Hotel[] = [];
  rooms: RoomModel[]=[];

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }
  ngOnInit(): void {
    
     this.id = this.route.snapshot.params['id'];
     this.loadRoomById();
     this.loadHotel();

  }


  loadRoomById() {

    this.roomService.getRoomsByHotelId(this.id).subscribe({

      next: (res) => {

        this.rooms = res;
        this.cdr.markForCheck();
      },

      error: (err) => console.error('Room fetching failed', err)
    });
  }

  onSubmit(): void {
    this.roomService.updateRoom(this.id, this.room).subscribe({

      next: (res) => this.router.navigate(['updateroom']),
      error: (err) => console.error('Update failed', err)
    });

  }

  loadHotel() {
    this.hotelService.getAllHotels().subscribe((data) => {
      this.hotels = data;
      this.cdr.markForCheck();
      this.cdr.reattach();
      console.log(data);
    });
  }


  compareHotel(l1: Hotel, l2: Hotel): boolean {

    return l1 && l2 ? l1.id === l2.id : l1 === l2;


  }
}
