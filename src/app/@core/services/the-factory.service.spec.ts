import { TestBed } from '@angular/core/testing';

import { TheFactoryService } from './the-factory.service';

describe('TheFactoryService', () => {
  let service: TheFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
