import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallbooking } from './viewallbooking';

describe('Viewallbooking', () => {
  let component: Viewallbooking;
  let fixture: ComponentFixture<Viewallbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallbooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
