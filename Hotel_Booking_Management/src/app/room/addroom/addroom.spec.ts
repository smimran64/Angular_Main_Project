import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addroom } from './addroom';

describe('Addroom', () => {
  let component: Addroom;
  let fixture: ComponentFixture<Addroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addroom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
