import { TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';
import { HttpClientModule } from '@angular/common/http';

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
