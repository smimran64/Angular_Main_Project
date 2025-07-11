import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomModel } from '../../model/room.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';

@Component({
  selector: 'app-addroom',
  standalone: false,
  templateUrl: './addroom.html',
  styleUrl: './addroom.css'
})
export class Addroom implements OnInit {

  rooms: RoomModel[] = [];
  hotels: Hotel[] = [];
  roomForm!: FormGroup;
  room: RoomModel = new RoomModel();

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private hotelService: HotelService

  ) { }
  ngOnInit(): void {

    this.loadHotel();
     this.loadRoom();

    this.roomForm = this.formBuilder.group({

      roomtype: [''],
      adults: [''],
      children: [''],
      price: [''],
      image: [''],

      hotel: this.formBuilder.group({

        id: [''],
        name: ['']

      })
    });

    this.roomForm.get('hotel')?.get('name')?.valueChanges.subscribe(name => {
      const selectedHotel = this.hotels.find(loc => loc.name === name);

      if (selectedHotel) {
        this.roomForm.patchValue({ hotel: selectedHotel });
      }
    });

  }

  loadHotel() {

    this.hotelService.getAllHotelforRoom().subscribe({

      next: res => {
        this.hotels = res;
      },

      error: err => {
        console.log(err);
      }
    })
  }

  AddRoom() {
     const room : RoomModel = { ...this.roomForm.value };
    this.roomService.addRoom(this.room).subscribe({

      next: (res) => {
  
        this.roomForm.reset();
        this.router.navigate(['viewroom']);
        this.cdr.markForCheck();

      },
      error: err => {
        console.log(err);
      }
    });
  }

  loadRoom(){
    this.roomService.getAllRoom().subscribe({
      next: (res)=>{

        this.rooms = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


}




