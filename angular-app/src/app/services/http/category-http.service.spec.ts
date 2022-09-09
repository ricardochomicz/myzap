import { TestBed } from '@angular/core/testing';

import { CategoryHttpService } from './category-http.service';

describe('CategoryHttpService', () => {
  let service: CategoryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
