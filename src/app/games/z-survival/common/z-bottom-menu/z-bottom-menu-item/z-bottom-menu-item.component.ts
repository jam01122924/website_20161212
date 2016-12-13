import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-z-bottom-menu-item',
  templateUrl: './z-bottom-menu-item.component.html',
  styleUrls: ['./z-bottom-menu-item.component.scss'],
  inputs: ['menuItem', 'w', 'h']
})
export class ZBottomMenuItemComponent implements OnInit {
  w: number;
  h: number;
	menuItem: any;
	menuName: string;
	imgUrl: string;
	icon: string;
	routeUrl: string;

  constructor() { }

  ngOnInit() {
		this.menuName = this.menuItem.name.toUpperCase();
		this.imgUrl = 'assets/imgs/games/z-survival/bottom-menu/bottom-menu-icon-' + this.menuItem.name + '.png';
		this.icon = this.menuItem.icon.toLowerCase();
		this.routeUrl = '/z-survival/main/' + this.menuItem.name.toLowerCase();
  }
}
