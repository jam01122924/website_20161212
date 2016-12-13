import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../../../../services/device.service';

@Component({
  selector: 'app-z-main',
  templateUrl: 'z-main.component.html',
  styleUrls: ['z-main.component.scss']
})
export class ZMainComponent implements OnInit {
	public h: number;
	public w: number;
  public loadingComplete: boolean = false;
  constructor(private _ds: DeviceService) { }

  ngOnInit() {
		this._ds.height$.subscribe(data => this.h = data);
		this._ds.width$.subscribe(data => this.w = data);
    setTimeout(()=>{this.loadingComplete = true}, 500);
  }
}
