import { Component, OnInit } from '@angular/core';
import { ZCharacterService } from '../../../services/z-character.service';

@Component({
  selector: 'app-z-me',
  templateUrl: './z-me.component.html',
  styleUrls: ['./z-me.component.scss']
})
export class ZMeComponent implements OnInit {
  topMenu: Array<any> = [];

  constructor(private _cs: ZCharacterService) {
    this.topMenu = [
      {
        icon: 'fa fa-address-card-o',
        text: 'Status',
        active: true
      },
      {
        icon: 'fa fa-sitemap',
        text: 'Skill',
        active: false
      },
      {
        icon: 'fa fa-magic',
        text: 'Talent',
        active: false
      },
      {
        icon: 'fa fa-male',
        text: 'Equipment',
        active: false
      },
      {
        icon: 'fa fa-briefcase',
        text: 'Inventory',
        active: false
      }
    ];
  }

  ngOnInit() {
  }

}
