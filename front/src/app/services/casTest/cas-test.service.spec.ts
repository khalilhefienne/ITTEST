import { TestBed } from '@angular/core/testing';

import { CasTestService } from './cas-test.service';

describe('CasTestService', () => {
  let service: CasTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
