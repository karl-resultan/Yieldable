import { TestBed } from '@angular/core/testing';

import { GetCropDataService } from './get-crop-data.service';

describe('GetCropDataService', () => {
  let service: GetCropDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCropDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
