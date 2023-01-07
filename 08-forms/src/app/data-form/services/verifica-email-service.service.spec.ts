import { TestBed } from '@angular/core/testing';

import { VerificaEmailServiceService } from './verifica-email-service.service';

describe('VerificaEmailServiceService', () => {
  let service: VerificaEmailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaEmailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
