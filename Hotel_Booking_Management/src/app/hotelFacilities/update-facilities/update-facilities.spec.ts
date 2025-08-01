import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFacilities } from './update-facilities';

describe('UpdateFacilities', () => {
  let component: UpdateFacilities;
  let fixture: ComponentFixture<UpdateFacilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFacilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFacilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
