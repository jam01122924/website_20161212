import { Injectable } from '@angular/core';

export enum ZSurvival_GameState {
  'start-menu',
  'character-create',
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
}
