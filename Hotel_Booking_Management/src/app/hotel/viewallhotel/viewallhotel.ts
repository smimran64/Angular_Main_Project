import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { forkJoin } from 'rxjs';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-viewallhotel',
  standalone: false,
  templateUrl: './viewallhotel.html',
  styleUrl: './viewallhotel.css'
})
export class Viewallhotel implements OnInit {

  hotels: Hotel[]=[];
  locations: Location []=[];

  constructor(
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private locationService: LocationService
  
  ) { }

  ngOnInit(): void {

    this.loadData();
  }  

  loadData():void{

    forkJoin({
      locations : this.locationService.getAllLocation(),
      hotels: this.hotelService.getAllHotel()
    }).subscribe({

      next : ({locations, hotels}) =>{


        this.locations = locations;
        this.hotels = hotels;
        this.cdr.markForCheck();
      },

      error: err => {

        console.error('Error Data Loading');
      }
    });

  }
  

  deleteHotel(id: string): void {

    this.hotelService.deleteHotel(id).subscribe({
      next: () => {

        this.cdr.reattach();
        this.loadData();
        this.cdr.markForCheck();
        // this.loadAllHotels();
      },
      error: (err) => {
        console.log(err);
      }

    });
  }



  getHotelById(id: string): void {

    this.hotelService.getHotelById(id).subscribe({
      next: (res) => {

        console.log(res)
        console.log("Data get Successfully");
        this.router.navigate(['/updatehotel', id]);

      },

      error: (err) => {

        console.log(err);
      }

    });

  }

}
