import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HotelCredentials } from '../../model/hotelCridentials.model';
import { HotelCridentialService } from '../../service/hotel-cridential-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-viewhotelbasic-info',
  standalone: false,
  templateUrl: './viewhotelbasic-info.html',
  styleUrl: './viewhotelbasic-info.css'
})
export class ViewhotelbasicInfo implements OnInit {

  hotelCridentials: HotelCredentials[] = [];

  constructor(
    private cridentialService: HotelCridentialService,
    private cdr: ChangeDetectorRef,

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
    this.cridentialService.getAllHotelCredentials().subscribe({
      next: (data) => {
        console.log('Data from API:', data);  // Eta add koro
        this.hotelCridentials = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotel cridentials:', err);
      }
    });
  }

  getLabel(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  objectKeys(obj: any): string[] {
    // Safely return keys or empty array
    return obj && typeof obj === 'object' ? Object.keys(obj) : [];
  }
}
