import { TestBed } from '@angular/core/testing';

import { CashServiceService } from './cash-service.service';

describe('CashServiceService', () => {
  let service: CashServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
