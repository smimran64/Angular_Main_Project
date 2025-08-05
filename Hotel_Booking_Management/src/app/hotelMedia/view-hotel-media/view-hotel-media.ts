import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelMedia } from '../../model/hotelMedia.model';
import { HotelMediaService } from '../../service/hotel-media.service';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';

@Component({
  selector: 'app-view-hotel-media',
  standalone: false,
  templateUrl: './view-hotel-media.html',
  styleUrl: './view-hotel-media.css'
})
export class ViewHotelMedia implements OnInit {

  mediaList: HotelMedia[] = [];
  hotels: Hotel[] = [];
  hotelMap = new Map<string, string>();
  loading = false;
  errorMessage = '';

  constructor(
    private mediaService: HotelMediaService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadHotelsAndMedia();
  }

  loadHotelsAndMedia() {
    this.loading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.hotelMap.clear();
        this.hotels.forEach(hotel => this.hotelMap.set(hotel.id, hotel.name));

        this.mediaService.getAllMedia().subscribe({
          next: media => {
            this.mediaList = media;
            this.loading = false;
            this.cdr.markForCheck();
          },
          error: err => {
            this.errorMessage = 'Error loading media';
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

}
