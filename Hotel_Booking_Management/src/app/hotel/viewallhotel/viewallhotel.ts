import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewallhotel',
  standalone: false,
  templateUrl: './viewallhotel.html',
  styleUrl: './viewallhotel.css'
})
export class Viewallhotel implements OnInit {

  hotels: Hotel[] = [];
  locations: Location[] = [];

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    this.loadLocations(); // For showing locationName instead of ID
  }

  // ✅ Load all hotels
  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        this.cdr.markForCheck();
        console.log('Hotels loaded:', this.hotels);
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
      }
    });
  }

  // ✅ Load all locations (for mapping locationId -> name)
  loadLocations(): void {
    this.locationService.getAllLocation().subscribe({
      next: (res) => {
        this.locations = res;
        this.cdr.markForCheck();
        console.log('Locations loaded:', this.locations);
      },
      error: (err) => {
        console.error('Error loading locations:', err);
      }
    });
  }

  // ✅ Map locationId to locationName
  getLocationName(locationId: string): string {
    const location = this.locations.find(loc => String(loc.id) === locationId);
    return location ? location.locationName : 'Unknown';
  }

  // ✅ Delete hotel by ID
  deleteHotel(id: string): void {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    this.hotelService.deleteHotel(id).subscribe({
      next: () => {
        console.log('Hotel deleted successfully');
        this.loadHotels();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error deleting hotel:', err);
      }
    });
  }

  // ✅ Navigate to update page
  getHotelById(id: string): void {
    this.router.navigate(['updatehotel', id]);
  }
}
