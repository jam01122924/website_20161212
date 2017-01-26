import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ZSurvival_GameState, ZGameStateService } from '../../services/z-game-state.service'

@Component({
  selector: 'app-open-tale',
  templateUrl: './open-tale.component.html',
  styleUrls: ['./open-tale.component.scss']
})
export class OpenTaleComponent implements OnInit {
  public openTaleFinish: boolean;
  private _frames: any[];
  private _currText: string;
  private _currImg: string;
  private _currFrame: number;
  private _renderTextFinished: boolean;
  constructor(private _gs: ZGameStateService, private router: Router) { }

  ngOnInit() {
    this.openTaleFinish = false;
    this._currFrame = 0;
    this._currText = '';
    this._currImg = '';
    this._renderTextFinished = true;
    this._frames = [
      {
        text: '',
        img: 'intro_0'
      },
      {
        text: 'Year 20XX, bio-hazard exposed all over the world. It infected almost 80% human on earth, and left the rest in horror and desperation.',
        img: 'intro_1'
      },
      {
        text: 'When it happened, you happen to be at home for a sickness leave. You consider yourself lucky, because most of your neighbours went to work, and they never went back.',
        img: 'intro_2'
      },
      {
        text: 'Sometimes you wonder if they are still alive, but for most of the time you just stay quiet in your basement, trying to avoid catching any unwanted attention.',
        img: 'intro_3'
      },
      {
        text: 'You never realize that your own city could be this quiet without those busy traffics. Opening a can of soda sounds like breaking a glass to you.',
        img: 'intro_4'
      },
      {
        text: 'On the first night, you found out something about the walkers. They do not sleep! And the noise they make in the night sounds extremely loud and creepy.',
        img: 'intro_5'
      },
      {
        text: 'You found a handy notebook in your study room. You decided to write some notes about these monsters before you forget.',
        img: 'intro_6'
      },
      {
        text: 'Now it has been 5 days, you are running out of clean water, and there is not much food left. In this very morning, you decided to go out and search for help, or anything that might be useful.',
        img: 'intro_7'
      }
    ]
    setTimeout(()=> {
          this.continue();
        }, 2200);

  }

  skipTale() {
    this.openTaleFinish = true;
  }

  continue() {
    if(this._renderTextFinished){
      this._currText = '';
      if(this._currFrame<(this._frames.length-1)) {
        this._currFrame++;
        this._renderTextFinished = false;
        this._currImg = this._frames[this._currFrame].img;
        this.renderText(this._frames[this._currFrame].text);
      }else {
        this._gs.gameState = ZSurvival_GameState['character-create'];
        this.router.navigate(['/z-survival/character-create']);
      }
    } else {
      this._currText = this._frames[this._currFrame].text;
      this._renderTextFinished = true;
    }
  }

  renderText(txt: string, index?: number) {
    index = index?index:0;
    if(!txt)
      return;

    if (this._renderTextFinished){
      return;
    }
    else {
      this._currText += txt[index];
      if(this._currText === txt) {
        this._renderTextFinished = true;
        return
      } else{
        setTimeout(()=> {
          this.renderText(txt, ++index);
        }, 30);
      }
    }
  }
}
