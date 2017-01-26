import { Component, OnInit } from '@angular/core';

import { UserStatusService } from '../../services/user-status.service';
import { ZSurvival_GameState, ZGameStateService } from '../../services/z-game-state.service';
import { ZCharacterService } from '../../services/z-character.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnInit {
  public confirmNewGamePanel: boolean = false;
  private confirmPanel: any;
  constructor(private router:Router, private _userStatusS: UserStatusService, private _cs: ZCharacterService, private _gs: ZGameStateService, private authS: AuthService) { }

  ngOnInit() {
    this.authS.checkUserLogin('z-survival').then(response => {
      this.confirmNewGamePanel = false;
      this.confirmPanel = {
        panelType: 'warn',
        hasCancelBtn: true,
        head: 'start new game',
        info: 'You will start a new game with a new character.',
        confirmInfo: 'Are you sure?'
      };
      this._cs.getCharacterList().subscribe(chars=>{
        this._userStatusS.isFirstTime = !chars.length;
      });
    });
  }

  confirmNewGame() {
    this.confirmNewGamePanel = true;
  }
  onResult(r: boolean) {
    this.confirmNewGamePanel = false;
    if(r) {
      this._gs.gameState = ZSurvival_GameState['open-tale'];
      this.router.navigate(['/z-survival/open-tale/']);
    }
  }
  continue() {
    this._gs.gameState = ZSurvival_GameState['main'];
    this.router.navigate(['/z-survival/main/']);
  }
}
