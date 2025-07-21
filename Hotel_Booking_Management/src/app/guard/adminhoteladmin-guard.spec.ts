import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminhoteladminGuard } from './adminhoteladmin-guard';

describe('adminhoteladminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminhoteladminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
