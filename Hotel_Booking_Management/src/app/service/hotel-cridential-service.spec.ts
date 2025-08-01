import { TestBed } from '@angular/core/testing';

import { HotelCridentialService } from './hotel-cridential-service';

describe('HotelCridentialService', () => {
  let service: HotelCridentialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelCridentialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
