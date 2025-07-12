import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrationform } from './registrationform';

describe('Registrationform', () => {
  let component: Registrationform;
  let fixture: ComponentFixture<Registrationform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Registrationform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registrationform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
