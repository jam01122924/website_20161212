import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ZSurvivalCharacter } from '../common/types/z-survival-character.type';
import { HttpService } from '../../../services/http.service';
import { ZValueService } from './z-value.service';
import {Subscribable} from "rxjs/Observable";
import {Subscription, Observable} from "rxjs";


@Injectable()
export class ZCharacterService {
  public char: any;

  constructor(private httpS: HttpService, private valueS: ZValueService) {
    this.char = {
      oldJob: {},
      status: {},
      attributes: {},
      icon: ''
    }
  }

  getOldJobList() {
    return this.httpS.get(this.valueS.url.oldJob);
  }
  getOldJob(id) {
    return this.httpS.get(this.valueS.url.oldJob + id + '/');
  }

  getSkillList(param?:any) {
    return this.httpS.get(this.valueS.url.skill, param);
  }
  getSkill(id) {
    return this.httpS.get(this.valueS.url.skill + id + '/');
  }

  createAttr(attrs: any) {
    return this.httpS.post(this.valueS.url.attributes, attrs);
  }
  getAttr(id) {
    return this.httpS.get(this.valueS.url.attributes + id + '/');
  }
  createStatus(status: any) {
    return this.httpS.post(this.valueS.url.status, status);
  }
  getStatus(id) {
    return this.httpS.get(this.valueS.url.status + id + '/');
  }
  createCharacter(char: any) {
    return this.httpS.post(this.valueS.url.character, char);
  }
  getCharacter(id) {
    return this.httpS.get(this.valueS.url.character + id + '/');
  }

  getCharacterList() {
    return this.httpS.get(this.valueS.url.character);
  }

  searchCharacterByName(name) {
    return this.httpS.get(this.valueS.url.characterSearch, {name: name, precise: true});
  }

  cleanLocalCharacters() {
    this.char = null;
  }

  initialCharacter() {
    this.getCharacterList().subscribe(charData=>{
      Observable.forkJoin(
        this.getOldJob(charData[0].oldJob),
        this.getStatus(charData[0].status),
        this.getAttr(charData[0].attributes)
      ).subscribe(data=>{
          this.char.oldJob = data[0];
          this.char.status = data[1];
          this.char.attributes = data[2];
          console.log(this.char);
          this.char.icon = 'assets/imgs/games/z-survival/head-icon/' + this.char.oldJob.id + '.png';
        }, error=>{
        console.log('Failed load character:', error);
      });
    });
  }

  initialStatusForCreate(attrs) {
    return {
      hp: 25 + attrs.endurance * 5,
      max_hp: 25 + attrs.endurance * 5,
      ap: 25 + attrs.agility*5,
      max_ap: 25 + attrs.agility*5,
      weight: 0,
      weight_max: 20 + attrs.strength*10,
      stamina: 800 + attrs.endurance * 100,
      max_stamina: 800 + attrs.endurance * 100,
      skillPoint: 0,
      exp: 0,
      lv: 1,
      dodge_rate: attrs.agility*0.03,
      hit_rate: 0.5 + attrs.perception*0.05,
      crt_rate: 0.1 + attrs.luck * 0.05,
      crt_dmg: 1.5 + attrs.luck * 0.1,
      hunger: 100,
      thirst: 100,
      health: 100,
      melee_dmg: 1 + attrs.strength*0.1,
      range_dmg: 1 + attrs.perception*0.1,
      energy_dmg: 1 + attrs.intelligence*0.1,
      persuade_rate: 0.4 + attrs.charisma*0.05,
      food_need: 1,
      water_need: 1,
      rest_rate: 1,
      recover_rate: 1,
      fire_resist: 0,
      cold_resist: 0,
      energy_resist: 0,
      poison_resist: 0,
      radiation_resist: 0
    }
  }
}
