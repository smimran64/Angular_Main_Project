import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../../model/hotel.model';
import { RoomService } from '../../service/room.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { RoomModel } from '../../model/room.model';

@Component({
  selector: 'app-addroom',
  standalone: false,
  templateUrl: './addroom.html',
  styleUrl: './addroom.css'
})
export class Addroom {


  roomForm!: FormGroup;
  hotels: Hotel[] = [];

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      image: ['', Validators.required],
      roomtype: ['', Validators.required],
      adults: [0, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      hotel: ['', Validators.required]  // holds hotel ID
    });

    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
      }
    });
  }

  addRoom(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    const newRoom: RoomModel = {
      ...this.roomForm.value
    };

    this.roomService.addRoom(newRoom).subscribe({
      next: (res) => {
        console.log('Room added:', res);
        this.router.navigate(['/roomview']); // Change route as needed
      },
      error: (err) => {
        console.error('Error adding room:', err);
      }
    });
  }

}
