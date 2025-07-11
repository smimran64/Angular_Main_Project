import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallhotel } from './viewallhotel';

describe('Viewallhotel', () => {
  let component: Viewallhotel;
  let fixture: ComponentFixture<Viewallhotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallhotel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallhotel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
