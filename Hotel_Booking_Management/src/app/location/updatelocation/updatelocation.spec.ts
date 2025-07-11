import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatelocation } from './updatelocation';

describe('Updatelocation', () => {
  let component: Updatelocation;
  let fixture: ComponentFixture<Updatelocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Updatelocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatelocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
