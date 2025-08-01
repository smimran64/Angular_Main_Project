import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBasicInfo } from './hotel-basic-info';

describe('HotelBasicInfo', () => {
  let component: HotelBasicInfo;
  let fixture: ComponentFixture<HotelBasicInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelBasicInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBasicInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
