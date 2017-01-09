import { Component, OnInit } from '@angular/core';

import { ZCharacterService } from '../../services/z-character.service';
enum CharacterCreateStep {
  'sex',
  'job',
  'skills',
  'confirm',
  'error',
  'success'
}

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss'],
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
  private _attrMax: number;
  private _skills: any[] = [];
  private _skillPoint: number;
  private _selectedSkills: boolean[] = [];
  private _result: any;
  private _successInfo: string;

  constructor(private characterS: ZCharacterService) { }

  ngOnInit() {
    this._step = 0;
    this._maxStep = 5;
    this._character = {
      name: '',
      sex: 'F'
    };
    this.confirmInfo = {};

    // job step:
    this.characterS.getOldJob().subscribe(data=>{
      this._oldjobs = data.results;
      this._currJob = 0;
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attr = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
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
    this._result = '';
    this._successInfo = 'Your Character has been created. You will enter the game world shortly...';

    this._attrPoint = 3;
    this._attrMax = 10;
    this._skillPoint = 2;
  }

  // Job Step Functions:
  jobNext() {
    if(this._oldjobs){
      this._currJob++;
      this._currJob = this._currJob===this._oldjobs.length?0:this._currJob;
      console.log(this._currJob);
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attr = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
    }
  }
  jobPrevious() {
    if(this._oldjobs){
      this._currJob--;
      this._currJob = this._currJob===-1?(this._oldjobs.length-1):this._currJob;
      console.log(this._currJob);
      this._character.oldJob = this._oldjobs[this._currJob];
      this._character.attr = JSON.parse(JSON.stringify(this._character.oldJob.attributes));
    }
  }

  changeAttr(key, value) {
    if(key && value && this._character.attr[key]) {
      this._character.attr[key] += value;
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
      this.next();
      console.log(this._step);
      console.log('GREAT!');
      let skills = [];
      for(let i = 0; i<this._selectedSkills.length; i++) {
        if(this._selectedSkills[i]) {
          skills.push(this._skills[i].name);
        }
      }

      if(this._character&&this._character.attr){
        this.characterS.createAttr(this._character.attr).subscribe(data => {
          console.log(data);
          let temp = {
            name: this._character.name,
            attributes: data.id,
            sex: this._character.sex,
            oldJob: this._character.oldJob.id,
            skill: skills,
            talent: [1]
          };
          this.characterS.createCharacter(temp).subscribe(char => {
            this._result = char;
            this.next();
          }, error => {
            this._result = JSON.parse(error._body).detail;
            if(error.status === 403) {
              this._result = 'Please login before you start to create your character!'
            }else {
              this._result = JSON.parse(error._body).detail;
            }
          })
        }, error => {
          this._result = JSON.parse(error._body).detail;
        });
      }



      //
      // if(this._character&&this._character.attr){
      //   let temp = {
      //     name: this._character.name,
      //     attributes: this._character.attr,
      //     sex: this._character.sex,
      //     oldJob: this._character.oldJob.id,
      //     talent: [],
      //     skill: skills
      //   };
      //   this.characterS.createCharacter(temp).subscribe(char => {
      //       this._result = char;
      //       this.next();
      //   }, error => {
      //     this._result = JSON.parse(error._body).detail;
      //     if(error.status === 403) {
      //       this._result = 'Please login before you start to create your character!'
      //     }else {
      //       this._result = JSON.parse(error._body).detail;
      //     }
      //   });
      // }





    }
  }

}
