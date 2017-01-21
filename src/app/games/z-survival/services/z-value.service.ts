import { Injectable } from '@angular/core';

import { ValueService } from '../../../services/value.service';

@Injectable()
export class ZValueService {

  private _constValue:any = {};
  private _url:any = {};

  constructor(private _vs: ValueService) {
    this._url = {
      root: this._vs.url.root + 'character/',
      character: 'character/character/',
      attributes: 'character/attributes/',
      oldJob: 'character/oldjob/',
      talent: 'character/talent/',
      skill: 'character/skill/',
      status: 'character/status/'
    };
  }

  get constValue():any {
    return this._constValue;
  }

  get url():any {
    return this._url;
  }

}
