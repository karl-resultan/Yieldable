import { TestBed } from '@angular/core/testing';

import { WeatherSlideService } from './weather-slide.service';

describe('WeatherSlideService', () => {
  let service: WeatherSlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
