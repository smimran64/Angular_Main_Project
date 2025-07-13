import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addbooking } from './addbooking';

describe('Addbooking', () => {
  let component: Addbooking;
  let fixture: ComponentFixture<Addbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addbooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
