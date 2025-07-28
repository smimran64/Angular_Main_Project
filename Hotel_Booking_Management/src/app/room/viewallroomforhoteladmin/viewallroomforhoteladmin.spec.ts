import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewallroomforhoteladmin } from './viewallroomforhoteladmin';

describe('Viewallroomforhoteladmin', () => {
  let component: Viewallroomforhoteladmin;
  let fixture: ComponentFixture<Viewallroomforhoteladmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Viewallroomforhoteladmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewallroomforhoteladmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
