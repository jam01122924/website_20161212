import { Component, OnInit } from '@angular/core';

import { DeviceService } from './services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	h: number;
	w: number;
  constructor(private _ds: DeviceService) { }

  ngOnInit() {
		this._ds.height$.subscribe(data => this.h = data);
		this._ds.width$.subscribe(data => this.w = data);
  }

}
