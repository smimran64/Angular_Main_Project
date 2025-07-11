import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallroom } from './viewallroom';

describe('Viewallroom', () => {
  let component: Viewallroom;
  let fixture: ComponentFixture<Viewallroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallroom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
