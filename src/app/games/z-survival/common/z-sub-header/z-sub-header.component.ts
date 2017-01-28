import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-z-sub-header',
  templateUrl: './z-sub-header.component.html',
  styleUrls: ['./z-sub-header.component.scss'],
})
export class ZSubHeaderComponent implements OnInit {
  @Input() menus = [];
  constructor() { }

  ngOnInit() {
  }
  clickMenu(menu){
    this.menus.map(m=>{
      m.active = false;
    });
    menu.active = true;
  }
}
