import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingpdffile } from './bookingpdffile';

describe('Bookingpdffile', () => {
  let component: Bookingpdffile;
  let fixture: ComponentFixture<Bookingpdffile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookingpdffile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingpdffile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
