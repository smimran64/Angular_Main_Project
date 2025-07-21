import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHotelBookingSystem } from './about-hotel-booking-system';

describe('AboutHotelBookingSystem', () => {
  let component: AboutHotelBookingSystem;
  let fixture: ComponentFixture<AboutHotelBookingSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutHotelBookingSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutHotelBookingSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
