import { Component, OnInit } from '@angular/core';

import { ZCharacterService } from '../../services/z-character.service';
enum CharacterCreateStep {
  'sex',
  'job',
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
  public confirmInfo: any;

  // job step:
  private _oldjobs: any[] = [];
  private _currJob: number;
  private _attrPoint: number;
  private _skills: any[] = [];
  private _skillPoint: number;
  private _selectedSkills: boolean[] = [];

  constructor(private characterS: ZCharacterService) { }

  ngOnInit() {
    this._step = 0;
    this._maxStep = 6;
    this._character = {
      name: '',
      sex: 'female'
    };
    this.confirmInfo = {};

    // job step:
    this.characterS.getOldJob().subscribe(data=>{
      this._oldjobs = data.results;
      this._currJob = 0;
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attributes = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
    });

    // skill step:
    let param = {
      requiredLv: 1
    };
    this.characterS.getSkill(param).subscribe(data=>{
      this._skills = data.results;
      for(let i=0; i< this._skills.length; i++) {
        this._selectedSkills.push(false);
      }
    });

    this._attrPoint = 3;
    this._skillPoint = 2;
  }

  // Job Step Functions:
  jobNext() {
    if(this._oldjobs){
      this._currJob++;
      this._currJob = this._currJob===this._oldjobs.length?0:this._currJob;
      console.log(this._currJob);
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attributes = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
    }
  }
  jobPrevious() {
    if(this._oldjobs){
      this._currJob--;
      this._currJob = this._currJob===-1?(this._oldjobs.length-1):this._currJob;
      console.log(this._currJob);
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attributes = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
    }
  }

  changeAttr(key, value) {
    if(key && value && this._character.attributes[key]) {
      this._character.attributes[key] += value;
      this._attrPoint -= value;
    }
  }

  selectSkill(index) {
    // Stop adding skills if there's no skill points left
    if(this._skillPoint<1 && !this._selectedSkills[index]) {
      return;
    }
    this._selectedSkills[index] = !this._selectedSkills[index];
    this._skillPoint += this._selectedSkills[index]?-1:1;
  }

  next() {
    if(this._step<this._maxStep){
      this._step++;
    }
  }
  previous() {
    if(this._step>0){
      this._step--;
      this.confirmInfo = {};
    }
  }
  confirm() {
    console.log(this._character);
    this.confirmInfo.nameError = (!this._character.name)?'Please Enter Your Character Name.':(this._character.name.length<4||this._character.name.length>20)?'Name length should be between 4-20 characters':false;
    this.confirmInfo.attrError = this._attrPoint === 0?false:'You still have attribute points left. Please assign them.';
    this.confirmInfo.skillError = this._skillPoint === 0?false:'You still have skill points left. Please assign them.';
    if(!this.confirmInfo.nameError && !this.confirmInfo.attrError && !this.confirmInfo.skillError) {
      console.log('GREAT!');
    }
  }

}
