import { TestBed } from '@angular/core/testing';

import { reportService } from './report.service';

describe('ReportService', () => {
  let service: reportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(reportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
