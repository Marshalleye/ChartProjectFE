import { TestBed } from '@angular/core/testing';

import { ChartFormResolver } from './chart-form.resolver';

describe('ChartFormResolver', () => {
  let resolver: ChartFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChartFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
