import { Component, OnInit } from '@angular/core';
import { ZCharacterService } from '../../../services/z-character.service';

@Component({
  selector: 'app-z-me',
  templateUrl: './z-me.component.html',
  styleUrls: ['./z-me.component.scss']
})
export class ZMeComponent implements OnInit {

  constructor(private _cs: ZCharacterService) { }

  ngOnInit() {
  }

}
