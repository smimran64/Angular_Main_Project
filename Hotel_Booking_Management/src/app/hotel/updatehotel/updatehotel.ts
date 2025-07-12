import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Hotel } from '../../model/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../model/location.model';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-updatehotel',
  standalone: false,
  templateUrl: './updatehotel.html',
  styleUrl: './updatehotel.css'
})
export class Updatehotel implements OnInit {

  id: string = '';
  hotel: Hotel = new Hotel();
  locations: Location[] = [];


  constructor(
    private hotelService: HotelService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.loadHotelById();
    this.loadLocation();
    
  }


  loadHotelById() {

    this.hotelService.getHotelById(this.id).subscribe({

      next : (res)=> {

        this.hotel = res;
        this.cdr.markForCheck();
      },

      error: (err)=> console.error('Hotel fetching failed', err)
    });
  }

  // for update data save

  onSubmit(): void {
    this.hotelService.updateHotel(this.id, this.hotel).subscribe({

      next: (res) => this.router.navigate(['']),
      error: (err) => console.error('Update failed', err)
    });

  }

  loadLocation() {
    this.locationService.getAllLocation().subscribe((data) => {
      this.locations = data;
      this.cdr.markForCheck();
      this.cdr.reattach();
      console.log(data);
    });
  }


  compareLocation(l1: Location, l2: Location): boolean{

    return l1 && l2 ? l1.id === l2.id : l1 === l2;


  }
}







