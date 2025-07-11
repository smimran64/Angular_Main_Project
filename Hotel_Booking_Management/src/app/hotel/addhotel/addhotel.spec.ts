import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addhotel } from './addhotel';

describe('Addhotel', () => {
  let component: Addhotel;
  let fixture: ComponentFixture<Addhotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addhotel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addhotel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
