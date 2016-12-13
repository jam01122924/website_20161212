import { Component, OnInit } from '@angular/core';
// import { MenuItemComponent } from './menu-item/menu-item.component';
// import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // directives: [MenuItemComponent, CollapseDirective],
  inputs: ['w', 'h']
})
export class HeaderComponent implements OnInit {
	linksLeft: string[] = [];
	linksRight: string[] = [];
	h: number;
	w: number;

  constructor(private _ms: MenuService) { }

  ngOnInit() {
		this.linksLeft = [
			'home',
			'work',
			'gallery'
		];
		this.linksRight = [
			'charts',
			'games',
			'find-us'
		];
	}
	clickMenu() {
		this._ms.trigger();
	}

}
