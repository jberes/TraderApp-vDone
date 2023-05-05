import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FakeStockDataService } from './fake-stock-data.service';

describe('FakeStockDataService', () => {
  let service: FakeStockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FakeStockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
