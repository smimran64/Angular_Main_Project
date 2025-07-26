import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class Viewallroom implements OnInit {

  hotels: Hotel[] = [];
  rooms: RoomModel[] = [];
  selectedHotelId: string = '';

  userRole: string = '';
  userHotelIds: string[] = [];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCurrentUserInfo();
    this.loadHotels();
  }

  getCurrentUserInfo(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userRole = userData?.role || '';

    // ✅ Ensure hotelid is string array
    if (Array.isArray(userData?.hotelid)) {
      this.userHotelIds = userData.hotelid.map((id: any) => String(id));
    } else if (userData?.hotelid) {
      this.userHotelIds = [String(userData.hotelid)];
    } else {
      this.userHotelIds = [];
    }

    console.log('User Role:', this.userRole);
    console.log('User Hotel IDs:', this.userHotelIds);
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        if (this.userRole === 'admin') {
          this.hotels = data;
          this.selectedHotelId = '';
          this.rooms = [];
        } else if (this.userRole === 'hoteladmin') {
          // ✅ Filter hotels that match the user’s assigned IDs
          this.hotels = data.filter(h => this.userHotelIds.includes(String(h.id)));
          if (this.hotels.length > 0) {
            this.selectedHotelId = this.hotels[0].id;
            this.loadRoomsByHotelId(this.selectedHotelId);
          }
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      }
    });
  }

  onHotelChange(): void {
    if (this.selectedHotelId) {
      this.loadRoomsByHotelId(this.selectedHotelId);
    } else {
      this.rooms = [];
    }
  }

  loadRoomsByHotelId(hotelId: string): void {
    this.roomService.getRoomsByHotelId(hotelId).subscribe({
      next: (data) => {
        this.rooms = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading rooms by hotel', err);
      }
    });
  }

  deleteRoom(id: string): void {
    this.roomService.deleteRoom(id).subscribe({
      next: () => {
        console.log('Room deleted');
        const hotelIdToReload = this.selectedHotelId;
        this.loadRoomsByHotelId(hotelIdToReload);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  getRoomById(id: string): void {
    this.router.navigate(['updateroom', id]);
  }
}
