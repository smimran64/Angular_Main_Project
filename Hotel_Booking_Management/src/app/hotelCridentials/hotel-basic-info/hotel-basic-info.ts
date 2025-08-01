import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common'; // ✅ browser check
import { Hotel } from '../../model/hotel.model';
import { HotelCridentialService } from '../../service/hotel-cridential-service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { HotelCredentials } from '../../model/hotelCridentials.model';

@Component({
  selector: 'app-hotel-basic-info',
  standalone: false, // ✅ correct for declared NgModule setup
  templateUrl: './hotel-basic-info.html',
  styleUrls: ['./hotel-basic-info.css'] // ✅ corrected from `styleUrl` to `styleUrls`
})
export class HotelBasicInfo implements OnInit {

  cridentialsForm!: FormGroup;
  hotels: Hotel[] = [];
  submitted = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cridentialService: HotelCridentialService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // ✅ platform injection for browser check
  ) { }

  ngOnInit(): void {
    this.cridentialsForm = this.fb.group({
      id: [''],
      hotelId: ['', Validators.required],
      OwnerInfo: ['', Validators.required],
      description: ['', Validators.required],
      hotelPolicy: ['', Validators.required],
      facilities: this.fb.group({
        FreeWifi: [false],
        FreeParking: [false],
        SwimmingPool: [false],
        Gym: [false],
        Restaurant: [false],
        RoomService: [false],
        AirConditioning: [false],
        LaundryService: [false],
        WheelchairAccessible: [false],
        healthServices: [false],
      })
    });

    this.loadHotels();
  }

  loadHotels(): void {
    // ✅ localStorage guarded for browser only
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Not running in a browser. Skipping localStorage access.');
      return;
    }

    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      console.error('User not logged in');
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.id;

    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data.filter(hotel => hotel.userId === userId);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading hotels:', err);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.cridentialsForm.invalid) {
      return;
    }

    const formData: HotelCredentials = this.cridentialsForm.value;

    this.cridentialService.addHotelCredentials(formData).subscribe({
      next: (res) => {
        this.successMessage = '✅ Hotel Credentials added successfully!';
        this.cridentialsForm.reset();
        this.submitted = false;
        this.router.navigate(['/viewcridentials']);
      },
      error: (err) => {
        console.error('Error adding credentials:', err);
      }
    });
  }

  getLabel(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

}
