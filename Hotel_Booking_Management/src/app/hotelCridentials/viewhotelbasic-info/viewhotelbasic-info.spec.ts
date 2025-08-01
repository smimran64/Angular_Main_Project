import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhotelbasicInfo } from './viewhotelbasic-info';

describe('ViewhotelbasicInfo', () => {
  let component: ViewhotelbasicInfo;
  let fixture: ComponentFixture<ViewhotelbasicInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewhotelbasicInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewhotelbasicInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
