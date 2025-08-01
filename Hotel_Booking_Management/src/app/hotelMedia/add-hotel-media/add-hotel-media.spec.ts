import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelMedia } from './add-hotel-media';

describe('AddHotelMedia', () => {
  let component: AddHotelMedia;
  let fixture: ComponentFixture<AddHotelMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHotelMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
