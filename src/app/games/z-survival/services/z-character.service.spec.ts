/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZCharacterService } from './z-character.service';

describe('ZCharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZCharacterService]
    });
  });

  it('should ...', inject([ZCharacterService], (service: ZCharacterService) => {
    expect(service).toBeTruthy();
  }));
});
