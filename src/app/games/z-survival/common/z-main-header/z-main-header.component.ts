import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../../services/auth.service";
import { ZCharacterService } from "../../services/z-character.service";
import { CharacterStatus } from "../types/z-survival-character.type";

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-z-main-header',
  templateUrl: './z-main-header.component.html',
  styleUrls: ['./z-main-header.component.scss']
})
export class ZMainHeaderComponent implements OnInit {
  public characterIcon: string;
  public characterStatus: CharacterStatus;

  constructor(private authS: AuthService, private characterS: ZCharacterService) { }

  ngOnInit() {
    this.getCharacterFullStatus();
    this.characterIcon = 'assets/imgs/games/z-survival/head-icon/0001.png';
  }

  getCharacterFullStatus() {
    this.characterS.getCharacterList().subscribe(charData=>{
      this.characterStatus = charData[0];
      Observable.forkJoin(
        this.characterS.getOldJob(charData[0].oldJob),
        this.characterS.getStatus(charData[0].status),
        this.characterS.getAttr(charData[0].attributes)
      ).subscribe(data=>{
          this.characterStatus.oldJob = data[0];
          this.characterStatus.status = data[1];
          this.characterStatus.attributes = data[2];
          this.characterIcon = 'assets/imgs/games/z-survival/head-icon/' + this.characterStatus.oldJob.id + '.png';
          console.log(this.characterStatus);
        }, error=>{
        console.log('Failed load character:', error);
      });
    }, error=>{
      console.log('Failed load character:', error);
    });
  }

}
