import { Injectable } from '@angular/core';

import { HttpService } from '../../../services/http.service';
import { ZValueService } from './z-value.service';

@Injectable()
export class ZCharacterService {

  constructor(private httpS: HttpService, private valueS: ZValueService) { }

  getOldJob() {
    return this.httpS.get(this.valueS.url.oldJob);
  }

  getSkill(param?:any) {
    return this.httpS.get(this.valueS.url.skill, param);
  }
}
