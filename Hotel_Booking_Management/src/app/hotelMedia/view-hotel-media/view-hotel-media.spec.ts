import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelMedia } from './view-hotel-media';

describe('ViewHotelMedia', () => {
  let component: ViewHotelMedia;
  let fixture: ComponentFixture<ViewHotelMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHotelMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHotelMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
