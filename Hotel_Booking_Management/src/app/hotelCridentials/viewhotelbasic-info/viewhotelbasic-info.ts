import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HotelCredentials } from '../../model/hotelCridentials.model';
import { HotelCridentialService } from '../../service/hotel-cridential-service';
import { isPlatformBrowser } from '@angular/common';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-viewhotelbasic-info',
  standalone: false,
  templateUrl: './viewhotelbasic-info.html',
  styleUrl: './viewhotelbasic-info.css'
})
export class ViewhotelbasicInfo implements OnInit {

  hotelCridentials: HotelCredentials[] = [];
  hotels: Hotel[] = [];
  hotelMap = new Map<string, string>();
  loading = false;
  errorMessage = '';

  constructor(
    private cridentialService: HotelCridentialService,
    private cdr: ChangeDetectorRef,
    private hotelService: HotelService,

    @Inject(PLATFORM_ID) private platformId: Object

  ) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // localStorage safe access
      const token = localStorage.getItem('token');
    }
    this.loadCridentials();
  }

  loadCridentials(): void {
    this.loading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.hotelMap.clear();
        this.hotels.forEach(hotel => this.hotelMap.set(hotel.id, hotel.name));

        this.cridentialService.getAllHotelCredentials().subscribe({

          next: cridentials => {
            this.hotelCridentials = cridentials;
            this.loading = false;
            this.cdr.markForCheck();
          },
          error: err => {
            this.errorMessage = 'Error loading cridentials';
            this.loading = false;
          }
        });
      },
      error: err => {
        this.errorMessage = 'Error loading hotels';
        this.loading = false;
      }
    });
  }

  getHotelName(hotelId: string): string {
    return this.hotelMap.get(hotelId) || 'Unknown Hotel';
  }



  getLabel(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  objectKeys(obj: any): string[] {
    // Safely return keys or empty array
    return obj && typeof obj === 'object' ? Object.keys(obj) : [];
  }
}
