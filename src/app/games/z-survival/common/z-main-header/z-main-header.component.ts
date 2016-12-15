import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-z-main-header',
  templateUrl: './z-main-header.component.html',
  styleUrls: ['./z-main-header.component.scss']
})
export class ZMainHeaderComponent implements OnInit {
  public characterIcon: string;

  constructor(private authS: AuthService) { }

  ngOnInit() {
    this.authS.getUserDetailData().subscribe(data=>{
      console.log(data);
      this.characterIcon = 'assets/imgs/games/z-survival/head-icon/0001.png'
    });
  }

}
