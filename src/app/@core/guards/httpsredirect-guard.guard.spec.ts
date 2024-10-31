import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hTTPSRedirectGuardGuard } from './httpsredirect-guard.guard';

describe('hTTPSRedirectGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hTTPSRedirectGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
