import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardsListService } from './dashboards-list.service';

describe('DashboardsListService', () => {
  let service: DashboardsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DashboardsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
