import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ZSurvival_GameState, ZGameStateService } from './services/z-game-state.service';
import { UserStatusService } from './services/user-status.service';
import { ZCharacterService } from './services/z-character.service';
import { ZValueService } from './services/z-value.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-z-survival',
  templateUrl: 'z-survival.component.html',
  styleUrls: ['z-survival.component.scss'],
  providers: [ZGameStateService, UserStatusService, ZCharacterService, ZValueService],
})
export class ZSurvivalComponent implements OnInit {
  private zSurvival_GameState = ZSurvival_GameState;
  constructor(private authS: AuthService, private router: Router, private _gs: ZGameStateService, private _cs: ZCharacterService, private _us: UserStatusService, private tokenS: TokenService) { }

  ngOnInit() {
    this.authS.checkUserLogin('z-survival').then(response => {
      // console.log(response);
      this._gs.gameState = ZSurvival_GameState['start-menu'];
      this.router.navigate(['/z-survival/start-menu']);
    });




    // this.authS.login('james', 'admin123').subscribe(data=>{
    //   console.log(data);
    //   if(data.token) {
    //     // console.log(this.tokenS.token);
    //     this.tokenS.token = data.token;
    //     this.authS.startRefreshToken(this.tokenS.token);
    //     this.authS.getUserData().subscribe(data => {
    //       this.authS.loggedIn = true;
    //       this.authS.currentUser = data[0];
    //     // this._gs.gameState = ZSurvival_GameState['character-create'];
    //
    //
    //
    //
    //       if(!this.authS.loggedIn){
    //         this.authS.returnUrl = 'z-survival';
    //         this.router.navigate(['login', ]);
    //       } else {
    //         this._cs.getCharacterList().subscribe(chars=>{
    //           this._cs.chars = chars;
    //           this._us.isFirstTime = !chars.length;
    //           this._gs.gameState = ZSurvival_GameState['start-menu'];
    //         });
    //       }
    //
    //
    //
    //     });
    //   }
    // });
  }

}
