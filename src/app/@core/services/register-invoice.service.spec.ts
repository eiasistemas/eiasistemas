import { TestBed } from '@angular/core/testing';

import { RegisterInvoiceService } from './register-invoice.service';

describe('RegisterInvoiceService', () => {
  let service: RegisterInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
