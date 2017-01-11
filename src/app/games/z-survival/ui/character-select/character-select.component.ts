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
    if(!this._cs.chars) {
      this._cs.getCharacters().subscribe(data=>{
        this._cs.chars = data;
      }, error=>{
        console.error(error);
      })
    }
  }

  continue(char) {
    this._cs.currChars = char;
    this._gs.gameState = ZSurvival_GameState['loading'];
  }

  backToMainMenu() {
    this._gs.gameState = ZSurvival_GameState['start-menu'];
  }

}
