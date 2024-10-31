import { TestBed } from '@angular/core/testing';

import { InvoceFormService } from './invoce-form.service';

describe('InvoceFormService', () => {
  let service: InvoceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
