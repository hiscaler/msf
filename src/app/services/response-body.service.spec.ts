import { TestBed } from '@angular/core/testing';

import { ResponseBodyService } from './response-body.service';

describe('ResponseBodyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseBodyService = TestBed.get(ResponseBodyService);
    expect(service).toBeTruthy();
  });
});
