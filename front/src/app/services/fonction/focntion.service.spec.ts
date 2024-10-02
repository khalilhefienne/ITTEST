import { TestBed } from '@angular/core/testing';

import { FocntionService } from './focntion.service';

describe('FocntionService', () => {
  let service: FocntionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FocntionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
