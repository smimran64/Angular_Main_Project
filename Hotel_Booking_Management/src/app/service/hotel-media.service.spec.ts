import { TestBed } from '@angular/core/testing';

import { HotelMediaService } from './hotel-media.service';

describe('HotelMediaService', () => {
  let service: HotelMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
