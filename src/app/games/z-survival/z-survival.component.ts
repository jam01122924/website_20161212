import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ZSurvival_GameState, ZGameStateService } from './services/z-game-state.service'
import { UserStatusService } from './services/user-status.service'

@Component({
  selector: 'app-z-survival',
  templateUrl: 'z-survival.component.html',
  styleUrls: ['z-survival.component.scss'],
  providers: [ZGameStateService, UserStatusService]
})
export class ZSurvivalComponent implements OnInit {
  private zSurvival_GameState = ZSurvival_GameState;
  constructor(private authS: AuthService, private router: Router, private _gs: ZGameStateService) { }

  ngOnInit() {
    // if(!this.authS.loggedIn){
    //   this.authS.returnUrl = 'z-survival';
    //   this.router.navigate(['login', ]);
    // } else if(this.isFirstTime) {
    //   this.router.navigate(['z-survival/intro']);
    // } else {
    //   this.router.navigate(['z-survival/main']);
    // }
    this._gs.gameState = ZSurvival_GameState['start-menu'];
    // if(true) {
    //   this.router.navigate(['z-survival/main']);
    //   this._gs.gameState = ZSurvival_GameState['main'];
    // } else {
    //   this.router.navigate(['z-survival/open-tale']);
    //   this._gs.gameState = ZSurvival_GameState['open-tale'];
    // }
  }

}
