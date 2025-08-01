import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelBasicInfo } from './update-hotel-basic-info';

describe('UpdateHotelBasicInfo', () => {
  let component: UpdateHotelBasicInfo;
  let fixture: ComponentFixture<UpdateHotelBasicInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHotelBasicInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHotelBasicInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
