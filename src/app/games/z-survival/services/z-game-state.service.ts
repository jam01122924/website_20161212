import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

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

  constructor(private cookieS: CookieService) { }

  get gameState() {
    return this._gameState;
  }

  set gameState(state:ZSurvival_GameState) {
    if(state!==null && state!==undefined) {
      this._gameState = state;
      this.cookieS.put('ZSurvival_GameState', this._gameState.toLocaleString());
    }
  }

  restoreGameStateInCookie() {
    this._gameState = ZSurvival_GameState[this.cookieS.get('ZSurvival_GameState')];
    return this._gameState;
  }

  saveGameUrl() {
    this.cookieS.put('ZSurvival_GameUrl', window.location.href);
  }
  restoreGameUrl() {
    window.location.href = this.cookieS.get('ZSurvival_GameUrl');
  }


  // Compare current game state with
  checkGameState(){

  }
}
