import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hoteladminGuard } from './hoteladmin-guard';

describe('hoteladminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hoteladminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
