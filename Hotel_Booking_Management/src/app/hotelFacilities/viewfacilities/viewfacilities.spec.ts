import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewfacilities } from './viewfacilities';

describe('Viewfacilities', () => {
  let component: Viewfacilities;
  let fixture: ComponentFixture<Viewfacilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewfacilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewfacilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
