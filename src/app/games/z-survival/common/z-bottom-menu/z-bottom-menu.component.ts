import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-z-bottom-menu',
  templateUrl: './z-bottom-menu.component.html',
  styleUrls: ['./z-bottom-menu.component.scss'],
  inputs: ['w', 'h']
})
export class ZBottomMenuComponent implements OnInit {
  w: number;
  h: number;
	bottomMenus: any[] = [];

  constructor() { }

  ngOnInit() {
    this.bottomMenus = [
      {
        name: 'hide',
        icon: 'home'
      },
      {
        name: 'map',
        icon: 'map'
      },
      {
        name: 'me',
        icon: 'id-badge'
      },
      {
        name: 'note',
        icon: 'folder-open'
      }
    ];
  }

}
