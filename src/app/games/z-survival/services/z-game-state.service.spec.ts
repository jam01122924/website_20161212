/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZGameStateService } from './z-game-state.service';

describe('ZGameStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZGameStateService]
    });
  });

  it('should ...', inject([ZGameStateService], (service: ZGameStateService) => {
    expect(service).toBeTruthy();
  }));
});
