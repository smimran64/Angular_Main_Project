import { TestBed } from '@angular/core/testing';

import { HoteladminprofileService } from './hoteladminprofile.service';

describe('HoteladminprofileService', () => {
  let service: HoteladminprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoteladminprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
