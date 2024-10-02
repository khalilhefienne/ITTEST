import { TestBed } from '@angular/core/testing';

import { SequenceTestService } from './sequence-test.service';

describe('SequenceTestService', () => {
  let service: SequenceTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequenceTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
