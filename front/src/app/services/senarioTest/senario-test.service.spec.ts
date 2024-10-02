import { TestBed } from '@angular/core/testing';

import { SenarioTestService } from './senario-test.service';

describe('SenarioTestService', () => {
  let service: SenarioTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenarioTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
