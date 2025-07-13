import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-viewallhotel',
  standalone: false,
  templateUrl: './viewallhotel.html',
  styleUrl: './viewallhotel.css'
})
export class Viewallhotel implements OnInit {

  hotels: Hotel[] = [];
  locations: Location[] = [];   // Optional if you want to map locationId to locationName

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService, // Optional
    private cdr: ChangeDetectorRef
   
  ) { }

  ngOnInit(): void {
    this.loadHotels();
    this.loadLocations(); // Optional if you want names
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        console.log('Hotels:', this.hotels);
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      }
    });
  }

  // ✅ OPTIONAL: Load locations to map ID -> Name
  loadLocations(): void {
    this.locationService.getAllLocation().subscribe({
      next: (res) => {
        this.locations = res;
        console.log('Locations:', this.locations);
      },
      error: (err) => {
        console.error('Error loading locations', err);
      }
    });
  }

  // ✅ Helper to get location name by ID
  getLocationName(locationId: string): string {
    const loc = this.locations.find(loc => loc.id === locationId);
    return loc ? loc.locationName : 'Unknown';
  }

 deleteHotel(id: string): void{

  this.hotelService.deleteHotel(id).subscribe({

    next: ()=>{
      console.log('Hotel Successfully deleted');
      this.loadHotels();
      this.cdr.reattach();
      this.cdr.markForCheck();
    },

    error: (err)=>{

      console.log('Delete Eooro!!!')
    }
  })
 }
}
