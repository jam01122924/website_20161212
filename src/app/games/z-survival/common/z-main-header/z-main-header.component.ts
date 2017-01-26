import { Component, OnInit } from '@angular/core';
import { ZCharacterService } from "../../services/z-character.service";


@Component({
  selector: 'app-z-main-header',
  inputs: ['readyFlag'],
  templateUrl: './z-main-header.component.html',
  styleUrls: ['./z-main-header.component.scss']
})
export class ZMainHeaderComponent implements OnInit {

  constructor(private _cs: ZCharacterService) { }

  ngOnInit() {
  }

}

