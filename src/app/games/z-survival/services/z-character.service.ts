import { Injectable } from '@angular/core';

import { HttpService } from '../../../services/http.service';
import { ZValueService } from './z-value.service';
import {Subscribable} from "rxjs/Observable";
import {Subscription} from "rxjs";

@Injectable()
export class ZCharacterService {

  constructor(private httpS: HttpService, private valueS: ZValueService) { }

  getOldJob() {
    return this.httpS.get(this.valueS.url.oldJob);
  }

  getSkill(param?:any) {
    return this.httpS.get(this.valueS.url.skill, param);
  }

  createAttr(attrs: any){
    return this.httpS.post(this.valueS.url.attributes, attrs);
  }
  createCharacter(char: any): any {
    return this.httpS.post(this.valueS.url.character, char);
  }
}
