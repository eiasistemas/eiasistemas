import { TestBed } from '@angular/core/testing';

import { RegisterTheFactoryInvoiceService } from './register-the-factory-invoice.service';

describe('RegisterTheFactoryInvoiceService', () => {
  let service: RegisterTheFactoryInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterTheFactoryInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
