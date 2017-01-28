import { Component, OnInit } from '@angular/core';
import { ZCharacterService } from '../../../../services/z-character.service';

@Component({
  selector: 'app-z-me-status',
  templateUrl: './z-me-status.component.html',
  styleUrls: ['./z-me-status.component.scss']
})
export class ZMeStatusComponent implements OnInit {

  constructor(private _cs: ZCharacterService) { }

  ngOnInit() {
  }

}
