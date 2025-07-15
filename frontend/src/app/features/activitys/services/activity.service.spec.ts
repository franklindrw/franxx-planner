import { TestBed } from '@angular/core/testing';

import { ActivitysService } from './activitys.service';

describe('ActivitysService', () => {
  let service: ActivitysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
