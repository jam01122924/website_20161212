/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZValueService } from './z-value.service';

describe('ZValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZValueService]
    });
  });

  it('should ...', inject([ZValueService], (service: ZValueService) => {
    expect(service).toBeTruthy();
  }));
});
