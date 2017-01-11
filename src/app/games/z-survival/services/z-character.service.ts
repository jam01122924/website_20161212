import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from '../../../services/http.service';
import { ZValueService } from './z-value.service';
import {Subscribable} from "rxjs/Observable";
import {Subscription, Observable} from "rxjs";

@Injectable()
export class ZCharacterService {
  public chars: any;
  public currChars: any;
  constructor(private httpS: HttpService, private valueS: ZValueService) { }

  getOldJob() {
    return this.httpS.get(this.valueS.url.oldJob);
  }

  getSkill(param?:any) {
    return this.httpS.get(this.valueS.url.skill, param);
  }

  createAttr(attrs: any) {
    return this.httpS.post(this.valueS.url.attributes, attrs);
  }
  createCharacter(char: any) {
    return this.httpS.post(this.valueS.url.character, char);
  }

  getCharacters() {
    return this.httpS.get(this.valueS.url.character);
  }

  cleanLocalCharacters() {
    this.chars = null;
  }
}
