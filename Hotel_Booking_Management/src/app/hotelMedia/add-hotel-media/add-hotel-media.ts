import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelMediaService } from '../../service/hotel-media.service';
import { HotelMedia } from '../../model/hotelMedia.model';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel-media',
  standalone: false,
  templateUrl: './add-hotel-media.html',
  styleUrl: './add-hotel-media.css'
})
export class AddHotelMedia implements OnInit {


  mediaForm!: FormGroup;
  submitted = false;
  successMessage = '';
  hotels: Hotel[] = [];

  constructor(
    private fb: FormBuilder,
    private mediaService: HotelMediaService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.mediaForm = this.fb.group({
      hotelId: ['', Validators.required],

      gallery: this.fb.array([
        this.fb.control('', Validators.required)
      ])
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

  // Getter for easy access
  get galleryControls() {
    return (this.mediaForm.get('gallery') as FormArray).controls;
  }

  addImageField(): void {
    (this.mediaForm.get('gallery') as FormArray).push(
      this.fb.control('', Validators.required)
    );
  }

  removeImageField(index: number): void {
    const control = this.mediaForm.get('gallery') as FormArray;
    if (control.length > 1) {
      control.removeAt(index);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.mediaForm.invalid) {
      return;
    }

    const formData: HotelMedia = this.mediaForm.value;

    this.mediaService.addMedia(formData).subscribe({
      next: () => {
        this.successMessage = '✅ Gallery saved successfully!';
        this.mediaForm.reset();
        this.submitted = false;
        // Reset to one empty field
        (this.mediaForm.get('gallery') as FormArray).clear();
        this.addImageField();

        this.router.navigate(['allGallery']);
      },
      error: (err) => {
        console.error('Error saving gallery:', err);
      }
    });
  }

}
