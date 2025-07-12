import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { Hotel } from '../../model/hotel.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateroom',
  standalone: false,
  templateUrl: './updateroom.html',
  styleUrl: './updateroom.css'
})
export class Updateroom  implements OnInit{

  room : RoomModel = new RoomModel();
  hotels: Hotel[]=[];
  roomForm!: FormGroup;
  id: string='';
  

  constructor(

    private roomService: RoomService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
   
    this.id = this.route.snapshot.params['id'];
    this.roomForm = this.formBuilder.group({
      roomtype :[''],
      adults: [''],
      children: [''],
      price: [''],
     hotel: this.formBuilder.group({
      id:[''],
      name:['']
     })
    });

    this.loadHotel();
    this.loadRoom();    

  }

  loadHotel():void{
    this.hotelService.getAllHotelforRoom().subscribe({
      next: (res: Hotel[]) => {
        this.hotels = res;

      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  loadRoom(): void{

    this.roomService.getRoomById(this.id).subscribe({
      next:(room: RoomModel)=>{
        this.room = room;
        this.roomForm.patchValue({
          roomtype: room.roomtype,
          adults: room.adults,
          children: room.children,
          price: room.price,
          hotel: room.hotel
        });
      },

      error: (err)=>{
        console.error(err);
      }
    });

  }

  updateRoom():void{   

    this.roomService.updateRoom(this.id, this.room).subscribe({
      next: ()=> {
        this.roomForm.reset();
        this.router.navigate(['roomview']);
        
      },

      error:(err)=>{
        console.error('Room Update failed',err);
      }
    })
  }
}
