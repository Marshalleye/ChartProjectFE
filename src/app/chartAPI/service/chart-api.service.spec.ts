import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ChartAPIService } from './chart-api.service';

describe('ChartAPIService', () => {
  let service: ChartAPIService;
  let httpClientMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    });
    service = TestBed.inject(ChartAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
