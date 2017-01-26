import { Injectable } from '@angular/core';

export enum ZSurvival_GameState {
  'loading',
  'start-menu',
  'character-create',
  'character-select',
  'open-tale',
  'main'
}

@Injectable()
export class ZGameStateService {
  private _gameState: ZSurvival_GameState;

  constructor() { }

  get gameState() {
    return this._gameState;
  }

  set gameState(state:ZSurvival_GameState) {
    if(state!==null && state!==undefined) {
      this._gameState = state;
    }
  }

  // Compare current game state with
  checkGameState(){

  }
}
