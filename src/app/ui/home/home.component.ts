import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  inputs: ['w', 'h']
})
export class HomeComponent implements OnInit {
	w: number;
	h: number;
	bgImgs: Array<string>;
	contentText: Array<string>;
  constructor(private _ds: DeviceService) { }

  ngOnInit() {
    this._ds.height$.subscribe(data => this.h = data);
		this._ds.width$.subscribe(data => this.w = data);
		this.bgImgs = [
			'intro',
			'thoughts',
			'workBench',
			'product'
		];
		this.contentText = [
			'intro',
			'thoughts',
			'workBench',
			'product'
		];
  }

}
