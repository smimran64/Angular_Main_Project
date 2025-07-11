import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { Router } from '@angular/router';
import { Location } from '../../model/location.model';

@Component({
  selector: 'app-addlocation',
  standalone: false,
  templateUrl: './addlocation.html',
  styleUrl: './addlocation.css'
})
export class Addlocation {

  formGroup!: FormGroup;

constructor(
private locationService: LocationService,
private formBuilder: FormBuilder,
private router: Router
) { }
  ngOnInit(): void {
    
    this.formGroup = this.formBuilder.group({
      
      locationName:['']
    });
  }


addLocation(): void {

  const loc: Location ={...this.formGroup.value};

  this.locationService.saveLocation(loc).subscribe({
    next: (res) =>{

      console.log("Location added successfully", res);
      this.formGroup.reset();
      this.router.navigate(['/viewlocation']);
    },
    error: (err)=>{

      console.log("Error adding location", err);
    }
  })
}


}
