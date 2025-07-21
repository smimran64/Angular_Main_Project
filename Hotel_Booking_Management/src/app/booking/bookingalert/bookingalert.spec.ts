import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingalert } from './bookingalert';

describe('Bookingalert', () => {
  let component: Bookingalert;
  let fixture: ComponentFixture<Bookingalert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookingalert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingalert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
