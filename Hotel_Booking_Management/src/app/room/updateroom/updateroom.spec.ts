import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateroom } from './updateroom';

describe('Updateroom', () => {
  let component: Updateroom;
  let fixture: ComponentFixture<Updateroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updateroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateroom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
