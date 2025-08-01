import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilities } from './add-facilities';

describe('AddFacilities', () => {
  let component: AddFacilities;
  let fixture: ComponentFixture<AddFacilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFacilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFacilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
