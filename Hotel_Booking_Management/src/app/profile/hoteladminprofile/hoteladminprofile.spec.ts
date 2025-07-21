import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoteladminprofile } from './hoteladminprofile';

describe('Hoteladminprofile', () => {
  let component: Hoteladminprofile;
  let fixture: ComponentFixture<Hoteladminprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hoteladminprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hoteladminprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
