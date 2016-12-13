import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  inputs: ['menuItem', 'w', 'h']
})
export class MenuItemComponent implements OnInit {
	w: number;
	h: number;
	menuItem: string;
	menuName: string;
	imgUrl: string;
	routeUrl: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.menuItem);
		this.menuName = this.menuItem.toUpperCase();
		this.imgUrl = 'assets/imgs/head/head-icon-' + this.menuItem + '.png';
		this.routeUrl = '/' + this.menuItem;
  }

}
