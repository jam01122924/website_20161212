import { Component, OnInit } from '@angular/core';

import { UserStatusService } from '../../services/user-status.service'
import { ZSurvival_GameState, ZGameStateService } from '../../services/z-game-state.service'

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnInit {
  public confirmNewGamePanel: boolean = false;
  private confirmPanel: any;
  constructor(private _userStatusS: UserStatusService, private _gs: ZGameStateService) { }

  ngOnInit() {
    this.confirmNewGamePanel = false;
    this.confirmPanel = {
      panelType: 'warn',
      hasCancelBtn: true,
      head: 'start new game',
      info: 'You will start a new game with a new character.',
      confirmInfo: 'Are you sure?'
    }
  }

  confirmNewGame() {
    this.confirmNewGamePanel = true;
  }
  onResult(r: boolean) {
    this.confirmNewGamePanel = false;
    if(r) {
      this._gs.gameState = ZSurvival_GameState['open-tale'];
    }
  }
  continue() {
    this._gs.gameState = ZSurvival_GameState['main'];
  }
}
