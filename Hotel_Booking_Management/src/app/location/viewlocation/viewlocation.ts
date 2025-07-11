import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';
import { Location } from '../../model/location.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewlocation',
  standalone: false,
  templateUrl: './viewlocation.html',
  styleUrl: './viewlocation.css'
})
export class Viewlocation implements OnInit {

  locations!: any;

  constructor(
    private locationService: LocationService,
    private router: Router,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadLocation();
  }

  loadLocation() {
    this.locationService.getAllLocation().subscribe((data) => {
      this.locations = data;
      this.cdr.markForCheck();
      this.cdr.reattach();
      console.log(data);
    });
  }

  deleteLocation(id: string): void {

    this.locationService.deleteLocation(id).subscribe({

      next: () => {

        console.log("Location deleted successfully");

        this.loadLocation();
        this.cdr.reattach();
        this.cdr.markForCheck();

      },

      error: (err) => {

        console.log("Error deleting location", err);
      }
    });



  }

  getLocationById(id: string): void {

    this.locationService.getLocationById(id).subscribe({

      next: (res) => {

        console.log(res);
        console.log("Location found");
        this.router.navigate(['/updatelocation', id]);

      },
      error: (err) => {

        console.log("Error fetching location", err);

      }


    });
  }

}
