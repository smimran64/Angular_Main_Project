import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { RoomModel } from '../../model/room.model';

@Component({
  selector: 'app-viewallroom',
  standalone: false,
  templateUrl: './viewallroom.html',
  styleUrl: './viewallroom.css'
})
export class Viewallroom  implements OnInit{

  rooms: any;
  hotels: any;

  constructor(
    private roomService: RoomService,
    private hotelService: HotelService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.rooms = this.roomService.getAllRoom();
    this.hotels = this.hotelService.getAllHotelforRoom();



  }

  deleteRoom(id:string){
    this.roomService.deleteRoom(id).subscribe({
      next: (res)=> {
        this.rooms = this.roomService.getAllRoom();
        this.router.navigate(['viewroom']);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  editRoom(id:RoomModel):void{
    this.router.navigate(['updateroom']);  
  }

}
