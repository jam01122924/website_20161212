import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { DeviceService } from '../../../../services/device.service';
import { AuthService } from '../../../../services/auth.service';
import { ZCharacterService } from '../../services/z-character.service';

@Component({
  selector: 'app-z-main',
  templateUrl: 'z-main.component.html',
  styleUrls: ['z-main.component.scss']
})
export class ZMainComponent implements OnInit {
	public h: number;
	public w: number;
  public loadingComplete: boolean = false;
  constructor(private _ds: DeviceService, private _cs: ZCharacterService, private authS: AuthService) { }

  ngOnInit() {
		this.loadingComplete = false;
    this.authS.checkUserLogin('z-survival').then(response => {
      this._cs.initialCharacter();
    });
		this._ds.height$.subscribe(data => this.h = data);
		this._ds.width$.subscribe(data => this.w = data);
    setTimeout(()=>{this.loadingComplete = true}, 800);

  }
}
