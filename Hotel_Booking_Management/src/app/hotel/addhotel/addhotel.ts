import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { forkJoin } from 'rxjs';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-addhotel',
  standalone: false,
  templateUrl: './addhotel.html',
  styleUrl: './addhotel.css'
})
export class Addhotel implements OnInit { 

  hotels: Hotel[] = [];
  formGroup!: FormGroup;
  hotel: Hotel = new Hotel();
  locations: Location[] = [];


  constructor(
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private locationService: LocationService

  ) { }



  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      name: [''],
      image: [''],
      address: [''],
      rating: [''],
      location: this.formBuilder.group({
        id: [''],
        locationName: ['']
      })

    });

    this.loadData();
    this. loadHotel();
  }

  loadData(): void {

    forkJoin({
      locations: this.locationService.getAllLocation(),
      hotels: this.hotelService.getAllHotel()
    }).subscribe({

      next: ({ locations, hotels }) => {


        this.locations = locations;
        this.hotels = hotels;
        this.cdr.markForCheck();
      },

      error: err => {

        console.error('Error Data Loading');
      }
    });

  }

  Addhotel(): void {
    const hotel: Hotel = { ...this.formGroup.value };

    this.hotelService.saveHotel(hotel).subscribe({

      next: (res) => {

        console.log("Hotel Saved", res);
        this.formGroup.reset();
        this.loadHotel();
        this.router.navigate(['']);
        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error("Error saving hotel", error);
      }
    });
  }

  loadHotel() {
    this.hotelService.getAllHotel().subscribe({
      next: res => {
        this.hotels = res;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  compareLocation(l1: Location, l2: Location): boolean {

    return l1 && l2 ? l1.id === l2.id : l1 === l2;


  }

}


