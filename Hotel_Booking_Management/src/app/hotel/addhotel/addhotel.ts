import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location.model';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-addhotel',
  standalone: false,
  templateUrl: './addhotel.html',
  styleUrl: './addhotel.css'
})
export class Addhotel implements OnInit {

  formGroup!: FormGroup;
  locations: Location[] = [];
  hotels: Hotel =new Hotel();
   user: User | null = null;

  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userAuthService: AuthService
  ) {}

  ngOnInit(): void {
    //  Your form control: location is a string, not an object
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      location: ['', Validators.required],
      userid:['',Validators.required]
       
    });

    this.loadLocations();
    this.loadUserDetails();

  }

  // Load all locations to show in <select>
  loadLocations(): void {
    this.locationService.getAllLocation().subscribe({
      next: (locations) => {
        this.locations = locations;        
        console.log( this.locations);
      },
      error: (err) => console.error('Error loading locations', err)
    });
  }

  //  Save hotel with locationId only
  addHotel(): void {
    if (this.formGroup.invalid) {
      console.error('Form invalid');
      return;
    }

    const hotel: Hotel = { ...this.formGroup.value };
    console.log('Saving hotel:', hotel);

    this.hotelService.saveHotel(hotel).subscribe({
      next: (res) => {
        console.log('Hotel saved', res);
        this.formGroup.reset();
      
        this.router.navigate(['/viewhotel']);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error saving hotel', err);
      }
    });
  }


   loadUserDetails(): void {
    this.user = this.userAuthService.getUserProfileFromStorage();
    if (this.user) {
      this.hotels.userid = this.user.id;
    }
  }
  

}


