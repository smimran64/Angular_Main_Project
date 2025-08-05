import { ChangeDetectorRef, Component } from '@angular/core';
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      image: ['', Validators.required],
      roomType: ['', Validators.required],
      totalRooms:['',Validators.required],
      adults: [0, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      hotelId: ['', Validators.required]  // holds hotel ID
    });

    this.loadHotels();
  }

 loadHotels(): void {
  const userData = localStorage.getItem('currentUser');
  if (!userData) {
    console.error('User not logged in');
    return;
  }

  const user = JSON.parse(userData);
  const userId = user.id;

  this.hotelService.getAllHotels().subscribe({
    next: (data) => {
      this.hotels = data.filter(hotel => hotel.userId === userId); // 👈 Filtering by userId
      this.cdr.markForCheck();
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
        this.router.navigate(['/viewallroomforhoteladmin']); // Change route as needed
      },
      error: (err) => {
        console.error('Error adding room:', err);
      }
    });
  }

}
