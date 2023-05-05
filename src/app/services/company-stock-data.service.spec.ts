import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyStockDataService } from './company-stock-data.service';

describe('CompanyStockDataService', () => {
  let service: CompanyStockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CompanyStockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
