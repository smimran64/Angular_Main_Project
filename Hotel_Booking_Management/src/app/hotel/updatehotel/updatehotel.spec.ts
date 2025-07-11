import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatehotel } from './updatehotel';

describe('Updatehotel', () => {
  let component: Updatehotel;
  let fixture: ComponentFixture<Updatehotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updatehotel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatehotel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
