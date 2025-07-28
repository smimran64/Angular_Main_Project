import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { RoomModel } from '../../model/room.model';
import { HotelService } from '../../service/hotel.service';
import { RoomService } from '../../service/room.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewallroomforhoteladmin',
  templateUrl: './viewallroomforhoteladmin.html',
  styleUrls: ['./viewallroomforhoteladmin.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Viewallroomforhoteladmin implements OnInit {

  hotels: Hotel[] = [];
  rooms: RoomModel[] = [];
  selectedHotelId: string = '';
  currentUserId: string = '';
  allRooms: RoomModel[] = [];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const role = this.authService.getCurrentUserRole();  // synchronous value pabe
    // Jodi role er sathe user id lagbe, tahole currentUserValue thakte hobe auth service e
    this.currentUserId = this.authService.currentUserValue?.id || '';
    this.loadHotelsByAdmin(this.currentUserId);
  }


  loadHotelsByAdmin(adminId: string) {
    // Use the method matching your hotelService for filtering by userId (hotel admin)
    this.hotelService.getHotelByUserId(adminId).subscribe({
      next: (hotels) => {
        this.hotels = hotels;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load hotels for hotel admin', err);
      }
    });

    this.roomService.getAllRoom().subscribe({
      next: (roomData) => {
        this.allRooms = roomData;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Room load error:', err);
      }
    });
  }

  onHotelChange(): void {
    this.rooms = [];
    if (this.selectedHotelId) {
      this.rooms = this.allRooms.filter(room => room.hotelId === this.selectedHotelId);
      this.cdr.markForCheck();
    }
  }


  // === Edit Room ===
  getRoomById(roomId: string): void {
    // Navigate to update room page or component with room id
    this.router.navigate(['/updateroom', roomId]);
  }

  // === Delete Room ===
  deleteRoom(roomId: string): void {
    if (!confirm('Are you sure you want to delete this room?')) {
      return;
    }
    this.roomService.deleteRoom(roomId).subscribe({
      next: () => {
        // After deletion reload rooms for the selected hotel
        this.onHotelChange();
        this.cdr.markForCheck();
        alert('Room deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete room', err);
        alert('Failed to delete room. Please try again.');
      }
    });
  }

}
