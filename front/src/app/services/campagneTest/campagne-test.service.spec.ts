import { TestBed } from '@angular/core/testing';

import { CampagneTestService } from './campagne-test.service';

describe('CampagneTestService', () => {
  let service: CampagneTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampagneTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
