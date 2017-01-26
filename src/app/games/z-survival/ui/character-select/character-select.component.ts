import { Component, OnInit } from '@angular/core';
import { ZCharacterService } from '../../services/z-character.service';
import { ZSurvival_GameState, ZGameStateService } from '../../services/z-game-state.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {
  private _characters: any;
  private zSurvival_GameState = ZSurvival_GameState;
  constructor(private _cs: ZCharacterService, private _gs: ZGameStateService) { }

  ngOnInit() {
    // if(!this._cs.chars) {
    //   this._cs.getCharacterList().subscribe(data=>{
    //     this._cs.chars = data;
    //   }, error=>{
    //     console.error(error);
    //   })
    // }
  }

  continue(char) {
    // this._gs.gameState = ZSurvival_GameState['loading'];
    // this._cs.setLocalCharacters(char);
    // console.log(this._cs.currChar);
    // setTimeout(()=>{this._gs.gameState = ZSurvival_GameState['main'];}, 800);
  }

  backToMainMenu() {
    this._gs.gameState = ZSurvival_GameState['start-menu'];
  }

}
