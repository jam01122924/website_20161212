import { Component, OnInit } from '@angular/core';

import { ZCharacterService } from '../../services/z-character.service';
enum CharacterCreateStep {
  'sex',
  'job',
  'talent',
  'Attributes',
  'skills',
  'confirm'
}

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})

export class CharacterCreateComponent implements OnInit {
  private _steps = CharacterCreateStep;
  private _step: CharacterCreateStep;
  private _maxStep: number;
  private _character: any;

  // job step:
  private _oldjobs: any[] = [];
  private _currJob: number;

  constructor(private characterS: ZCharacterService) { }

  ngOnInit() {
    this._step = 0;
    this._maxStep = 6;
    this._character = {
      name: '',
      sex: 'female'
    };

    // job step:
    this.characterS.getOldJob().subscribe(data=>{
      this._oldjobs = data.results;
      this._currJob = 0;
      this._character.oldJob = this._oldjobs[this._currJob];
    })
  }

  // Job Step Functions:
  jobNext() {
    if(this._oldjobs){
      this._currJob++;
      this._currJob %= this._oldjobs.length;
      this._character.oldJob = this._oldjobs[this._currJob];
    }
  }
  jobPrevious() {
    if(this._oldjobs){
      this._currJob--;
      this._currJob %= this._oldjobs.length;
      this._character.oldJob = this._oldjobs[this._currJob];
    }
  }

  next() {
    if(this._step<this._maxStep){
      this._step++;
    }
  }
  previous() {
    if(this._step>0){
      this._step--;
    }
  }
  confirm() {
    console.log(this._character);
  }

}
