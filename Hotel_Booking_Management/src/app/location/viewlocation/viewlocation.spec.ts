import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewlocation } from './viewlocation';

describe('Viewlocation', () => {
  let component: Viewlocation;
  let fixture: ComponentFixture<Viewlocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewlocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewlocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
