import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelMedia } from './update-hotel-media';

describe('UpdateHotelMedia', () => {
  let component: UpdateHotelMedia;
  let fixture: ComponentFixture<UpdateHotelMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHotelMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHotelMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
